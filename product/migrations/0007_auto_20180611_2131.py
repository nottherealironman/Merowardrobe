# Generated by Django 2.0.4 on 2018-06-11 15:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0006_auto_20180611_2111'),
    ]

    operations = [
        # migrations.RemoveField(
        #     model_name='productuploads',
        #     name='type',
        # ),
        # migrations.AddField(
        #     model_name='productuploads',
        #     name='file',
        #     field=models.ImageField(default='product/image.jpg', upload_to='product'),
        # ),
        # migrations.AddField(
        #     model_name='productuploads',
        #     name='filetype',
        #     field=models.IntegerField(null=True),
        # ),
        migrations.AlterField(
            model_name='productuploads',
            name='product',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='product.Product'),
        ),
    ]