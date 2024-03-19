# Recipe Organizer
Welcome to the Recipe Organizer application, designed to help restaurants manage their recipes efficiently. This application is built using Django REST Framework for the backend and React for the frontend, providing a seamless user experience.

## Features

### Recipe View
View detailed information about a specific recipe, including its title, ingredients, and instructions.
### Recipe List View
Browse through a list of recipes to find the desired one quickly.
### Recipe Entry
Admins can easily enter new recipes into the system, ensuring the database stays up-to-date with the latest culinary creations.
### Scrape Recipe Page
Import recipes from external websites by scraping their content, automating the process of adding new recipes to the database.

## Technologies Used
### Backend:
- Django REST Framework: For building a RESTful API to manage recipes and users
- PostgreSQL: For storing recipe and user data
- Celery: For handling background tasks, such as scraping recipe pages
- Redis: Used as a message broker for Celery
### Frontend:
- React: For building an interactive user interface
- React Router: For client-side routing to navigate between different views
- Redux: For state management across the application
### Development Tools:
- Docker: For containerization and easy deployment
- pytest: For writing and running backend tests
- Jest and React Testing Library: For writing and running frontend tests
- GitHub Actions: For continuous integration and automated testing
### Boilerplate:
This project was bootstrapped using the [Django React Boilerplate](https://github.com/vintasoftware/django-react-boilerplate) by vintasoftware on GitHub.


## Setup
1. Clone the repository: 
`git clone https://github.com/vedavitshetty/Recipe-Organizer/`
2. Navigate to the project directory:
`cd recipe_organizer`
3. Build and run the Docker containers:
`docker-compose up --build`
4. Access the application in your browser at http://localhost:8000

## Usage
1. Browse through the list of recipes to find the desired one.
2. Add recipes to the restaurant your account is affiliated with for ease of access later
3. Click on a recipe to view its details, including title, ingredients, and instructions.
4. Admins can log in to the admin panel to add new recipes or manage existing ones.

## Additional Notes
- Data Model: The data model includes entities for recipes, users, and restaurants. Recipes are associated with multiple restaurants, allowing for easy sharing across different establishments.
- Scraping: The scraping functionality utilizes libraries like BeautifulSoup or Scrapy to parse recipe pages from allrecipes.com.
- Production Readiness: While the codebase strives to be production-ready, areas such as error handling, input validation, and security measures (e.g., CSRF protection, user authentication) may require further refinement for deployment in a real-world environment.

## User Experience
The Recipe Organizer application is designed with simplicity and ease of use in mind. Here's how users interact with the application:

- **User Authentication**: Users can sign up for an account and log in to access the application. This ensures that only authorized users can view and manage recipes.
- **Recipe List View**: Upon logging in, users are presented with a list of recipes. Each recipe is displayed with columns for name, ingredients, and actions. Users can easily find recipes using the browser's search functionality (command + f or control + f).
- **Toggle Between Restaurant and Non-Restaurant Recipes**: Users can toggle between viewing restaurant-specific recipes and general recipes. This allows restaurant owners to focus on recipes relevant to their establishment.
- **View Recipe Details**: Users can click on a recipe to view additional details, including instructions. They can either right-click to open the recipe in a new tab for a more detailed view or simply click on it and use the browser's back button to return to the recipe list.
- **Logout Option**: At any point, users can click the logout button to securely log out of their account. This redirects them to the login screen, ensuring their session is terminated.

## ChatGPT Utilization
ChatGPT played a significant role in the development of this application. It assisted in various aspects, including:
- Generating skeleton code for user interface pages
- Assisting with React routing through Django
- Providing solutions to authentication-related issues
- Helping to overcome writer's block during documentation creation


## System Design, Technical Decisions and Future Enhancements
- Please check out the [Recipe Organizer Documentation](https://instinctive-tailor-c75.notion.site/Recipe-Organizer-Documentation-3d1af6bd698a41b88d99abf3547157b0)
