# -*- coding: utf-8 -*-
{
    'name': 'Óptica Clínica - Snippet Interactivo',
    'version': '17.0.1.0.0',
    'category': 'Website',
    'summary': 'Sippets website',
    'author': 'Christian Torres',
    'depends': ['website'],          
    'data': [
        'views/snippets.xml',        
    ],
        'web.assets_frontend': [
            'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js',
            'analizador_interactivo_radiacion/static/src/js/optica_slider.js',
            'analizador_interactivo_radiacion/static/src/scss/snippets_neumorficos.scss',
        ],
    },
    'installable': True,
    'application': False,
    'license': 'LGPL-3',
}
