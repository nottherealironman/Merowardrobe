# Generated by Django 2.0 on 2019-02-26 07:04

from django.db import migrations, models
import product.models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0015_auto_20181024_1155'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productuploads',
            name='file',
            field=models.ImageField(default='product/image.jpg', upload_to=product.models.custom_filename),
        ),
    ]