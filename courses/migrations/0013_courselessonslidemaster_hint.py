# Generated by Django 3.0.1 on 2020-05-02 22:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0012_auto_20200408_0155'),
    ]

    operations = [
        migrations.AddField(
            model_name='courselessonslidemaster',
            name='hint',
            field=models.TextField(blank=True, default=None, null=True),
        ),
    ]