# -*- coding: utf-8 -*-
{
    'name': 'Óptica Clínica - Snippet Interactivo',
    'version': '17.0.1.0.0',
    'category': 'Website',
    'summary': 'Bloque interactivo de longitud de onda para sitio web',
    'author': 'Christian Torres',
    'depends': ['website'],          
    'data': [
        'views/snippets.xml',        
    ],
    'assets': {
        'web.assets_frontend': [
            'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js',
            'optica_snippet/static/src/js/optica_slider.js',
        ],
    },
    'installable': True,
    'application': False,
    'license': 'LGPL-3',
}
