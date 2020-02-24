# Generated by Django 2.2 on 2019-06-05 09:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('till_sys', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='breadType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64)),
                ('price_change', models.FloatField(blank=True, null=True)),
            ],
        ),
        migrations.AddField(
            model_name='menu_item',
            name='breadType',
            field=models.ManyToManyField(blank=True, to='till_sys.breadType'),
        ),
    ]
