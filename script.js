$(document).ready(function()
{
    $.ajax({
        type: 'POST',
        url: 'send.php',
        data: { inici: 'ccaa' },
        dataType: 'json',
        success: function(data)
        {
            console.log(data);
            $('#ccaa').append($('<option>',
            {
                selected: true,
                disabled: true
            }).text('Selecciona una C.A.'));
            
            $.each(data, function(i, e) // https://api.jquery.com/each/#each-function
            {
                $('#ccaa').append($('<option>',
                {
                    value: e.id_comunidad
                }).text(e.nombre));
            });
        }
    });

    $('#ccaa').on('change',function()
    {
        let comunitatAct = $(this).val();

        $.ajax(
        {
            type: 'POST',
            url: 'send.php',
            data: { comunitats: comunitatAct },
            dataType: 'json',
            success: function(data)
            {
                console.log(data);
                $('#prov').html(''); // Per eliminar les dades anteriors https://api.jquery.com/html/
                $('#prov').append($('<option>',
                {
                    selected: true,
                    disabled: true
                }).text('Selecciona una provincia'));

                $.each(data, function(i, e)
                {
                    $('#prov').append($('<option>',
                    {
                        value: e.id_provincia
                    }).text(e.provincia));
                });

                $('#prov').prop('disabled', false);
                $('#muni').prop('disabled', true).html('');
                updateInfo();
            }
        });
    });

    $('#prov').on('change',function()
    {
        let provAct = $(this).val();

        $.ajax(
        {
            type: 'POST',
            url: 'send.php',
            data: { provincies: provAct },
            dataType: 'json',
            success: function(data)
            {
                console.log(data);
                $('#muni').html('');
                $('#muni').append($('<option>',
                {
                    selected: true,
                    disabled: true
                }).text('Selecciona un municipi'));

                $.each(data, function(i, e)
                {
                    $('#muni').append($('<option>',
                    {
                        value:e.id_municipio
                    }).text(e.nombre));
                });

                $('#muni').prop('disabled', false);
                updateInfo();
            }
        });
    });

    $('#muni').on('change',function()
    {
        updateInfo();
    });

    function updateInfo()
    {
        $('#info').empty();
        let selecCcaa = $('#ccaa').find('option:selected').text();
        let selecProv = $('#prov').find('option:selected').text();
        let selecMuni = $('#muni').find('option:selected').text();

        if (selecCcaa)
        {
            $('<p>').text('Comunidad Autónoma: ' + selecCcaa).appendTo('#info');
        }

        if (selecProv)
        {
            $('<p>').text('Provincia: ' + selecProv).appendTo('#info');
        }

        if (selecMuni)
        {
            $('<p>').text('Municipio: ' + selecMuni).appendTo('#info');
        }
    }
});
