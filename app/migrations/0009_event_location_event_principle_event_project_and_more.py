# Generated by Django 4.0.5 on 2022-06-06 19:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0008_alter_measurementorfactparameter_options_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='location',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='app.location'),
        ),
        migrations.AddField(
            model_name='event',
            name='principle',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='event_principle', to='app.person'),
        ),
        migrations.AddField(
            model_name='event',
            name='project',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='app.project'),
        ),
        migrations.AlterField(
            model_name='event',
            name='members',
            field=models.ManyToManyField(related_name='event_members', to='app.person', verbose_name='list of sites'),
        ),
        migrations.AlterField(
            model_name='plant',
            name='species',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='app.species'),
        ),
    ]
