# Generated by Django 4.1.1 on 2022-10-21 17:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('map', '0002_alter_jsons_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jsons',
            name='the_geojson',
            field=models.JSONField(null=True),
        ),
    ]
