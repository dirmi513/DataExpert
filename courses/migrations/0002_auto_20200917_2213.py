# Generated by Django 3.0.6 on 2020-09-17 22:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CourseSummary',
            fields=[
                ('cls', models.IntegerField(primary_key=True, serialize=False)),
                ('summary', models.TextField(blank=True, default=None, null=True)),
            ],
        ),
        migrations.AlterField(
            model_name='courselessonslidemaster',
            name='courseNumber',
            field=models.IntegerField(default=-1),
        ),
        migrations.AlterField(
            model_name='courselessonslidemaster',
            name='lessonNumber',
            field=models.IntegerField(default=-1),
        ),
        migrations.AlterField(
            model_name='courselessonslidemaster',
            name='slideNumber',
            field=models.IntegerField(default=-1),
        ),
    ]
