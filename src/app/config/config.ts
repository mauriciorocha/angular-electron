export var config:any =
{
    supervisor: {
        "hosts": [{
            "nameHost": "MaxVex DEV",
            "host": "10.1.3.125",
            "port": "9001",
            "user": "maxvex_dev",
            "password": "123"
        },
        {
            "nameHost": "MaxVex HML",
            "host": "10.1.3.125",
            "port": "9001",
            "user": "maxvex_dev",
            "password": "123"
        },
        {
            "nameHost": "MaxVex PRO",
            "host": "10.1.3.125",
            "port": "9001",
            "user": "maxvex_dev",
            "password": "123"
        }]
    },
    ambientes: {
        'local': 'http://localhost/api/',
        'dev': 'https://dev-maxvex.brscan.com.br/api/',
        'hml': 'https://hml-maxvex.brscan.com.br/api/',
        'prod': 'https://maxvex.brscan.com.br/api/'
    },
    arrAmbientes: [
        'http://localhost/api/',
        'https://dev-maxvex.brscan.com.br/api/',
        'https://hml-maxvex.brscan.com.br/api/',
        'https://maxvex.brscan.com.br/api/'
    ]
    
};