# Generated by Django 2.0.4 on 2018-06-27 18:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0004_auto_20180627_2344'),
    ]

    operations = [
        migrations.AlterField(
            model_name='store',
            name='pan',
            field=models.IntegerField(),
        ),
    ]