# Generated by Django 4.0.5 on 2022-06-06 20:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0010_measurementorfact_event_measurementorfact_plants'),
    ]

    operations = [
        migrations.RenameField(
            model_name='measurementorfact',
            old_name='plants',
            new_name='plant',
        ),
    ]
