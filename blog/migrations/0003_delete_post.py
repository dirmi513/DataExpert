# Generated by Django 3.0.1 on 2020-04-12 18:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0002_auto_20200104_1825'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Post',
        ),
    ]