# Generated by Django 3.0.6 on 2020-09-21 16:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0002_auto_20200917_2213'),
    ]

    operations = [
        migrations.RenameField(
            model_name='coursesummary',
            old_name='cls',
            new_name='courseNumber',
        ),
    ]
