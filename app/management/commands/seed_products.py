from app.models import Product
from django.contrib.auth.models import User
from django.core.management.base import BaseCommand, CommandError
import json
import os
from django.conf import settings

class Command(BaseCommand):
    help = 'Creating Admin and Seeding products to a user'

    def handle(self, *args, **kwargs):
        user = User.objects.filter(username='admin').first()
        if user:
            self.stdout.write("Already seeded")
        else:
            user = User.objects.create_superuser('admin', 'admin@example.com', 'password')
            with open(settings.BASE_DIR+"/app/fixtures/initial_products_data.json") as json_file:
                products = json.load(json_file)
                for prod in products:
                    Product.objects.create(name=prod['fields']['name'],desc=prod['fields']['desc'],price=prod['fields']['price'],image=prod['fields']['image'],owner=user)
                self.stdout.write("DONE imported {} products".format(len(products)))