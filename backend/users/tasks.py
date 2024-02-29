from django.core import management

from recipe_organizer import celery_app


@celery_app.task
def clearsessions():
    management.call_command("clearsessions")
