import json

from django.core.management.base import BaseCommand

import requests
from bs4 import BeautifulSoup
from recipe_organizer.models import Recipe
from recipe_scrapers import scrape_me


class Command(BaseCommand):
    text_help = 'Scrape recipe pages and import into the database'

    def fetch_recipe_urls(self, base_url="https://www.allrecipes.com/recipes/"):
        try:
            page = requests.get(base_url, timeout=5)
            soup = BeautifulSoup(page.content, "html.parser")
            script_tag = soup.find('script', id='allrecipes-schema_1-0')
            if script_tag:
                json_data = json.loads(script_tag.string)
                recipe_urls = [item['url'] for item in json_data[0]['itemListElement']]
                return recipe_urls
            else:
                print("Script tag not found or does not contain JSON data.")
                return []
        except requests.exceptions.RequestException as e:
            print("Error fetching recipe URLs:", e)
            return []

    def handle(self, *args, **options):
        urls = self.fetch_recipe_urls()

        for url in urls:
            scraper = scrape_me(url)

            try:
                title = scraper.title()
            except (AttributeError, TypeError):
                self.stdout.write(self.style.WARNING(f'Error retrieving title for URL: {url}. Skipping import.'))
                continue

            instructions = scraper.instructions()
            ingredients = scraper.ingredients()  # Get list of ingredients directly

            # Create Recipe instance
            recipe, created = Recipe.objects.get_or_create(
                title=title,
                defaults={'instructions': instructions, 'ingredients': ingredients, 'source_url': url}
            )

            if created:
                self.stdout.write(self.style.SUCCESS(f'Recipe "{title}" imported successfully'))
            else:
                self.stdout.write(self.style.WARNING(f'Recipe "{title}" already exists'))
