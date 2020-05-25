# Generated by Django 2.2.7 on 2019-12-24 17:40

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='CourseLessonSlideMaster',
            fields=[
                ('cls', models.IntegerField(primary_key=True, serialize=False)),
                ('course', models.CharField(max_length=100)),
                ('lesson', models.CharField(max_length=100)),
                ('slide', models.CharField(max_length=100)),
                ('defaultCode', models.TextField(blank=True, default=None, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Slides',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('code', models.TextField()),
                ('completed', models.CharField(default='F', max_length=1)),
                ('cls', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='courses.CourseLessonSlideMaster')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]