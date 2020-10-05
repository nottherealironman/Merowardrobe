# Generated by Django 2.0.4 on 2018-06-25 07:38

from django.db import migrations, models
import store.models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='store',
            name='pan',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='store',
            name='pan_uploads',
            field=models.FileField(default='store/image.jpg', upload_to=store.models.custom_uploads),
        ),
        migrations.AddField(
            model_name='store',
            name='phone',
            field=models.CharField(default='986905955', max_length=15),
        ),
    ]