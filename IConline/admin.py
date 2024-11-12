# Register your models here.
from django.contrib import admin

from .models import Alunos, Cursos, Disciplinas, Material, Professores

admin.site.register(Alunos)
admin.site.register(Disciplinas)
admin.site.register(Cursos)
admin.site.register(Professores)
admin.site.register(Material)
