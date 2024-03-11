$(document).ready(function()
{
    $.ajax({
        type: 'POST',
        url: 'send.php',
        data: { inici: 'comunidades_autonomas' },
        dataType: 'json',
        success: function(data)
        {
            console.log(data);
            $('#ccaa').append('<option selected disabled>Selecciona una C.A.</option>');
            
            $.each(data, function(i, e) // https://api.jquery.com/each/#each-function
            {
                $('#ccaa').append('<option value="'+ e.id_comunidad +'">'+ e.nombre +'</option>');
            });
        }
    });

    $('#ccaa').change(function()
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
                $('#prov').append('<option selected disabled>Selecciona una provincia</option>');

                $.each(data, function(i, e)
                {
                    $('#prov').append('<option value="'+ e.id_provincia +'">'+ e.provincia +'</option>');
                });

                $('#prov').prop('disabled', false);
                $('#muni').prop('disabled', true).html('');
            }
        });
    });

    $('#prov').change(function()
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
                $('#muni').append('<option selected disabled>Selecciona un municipi</option>');

                $.each(data, function(i, e)
                {
                    $('#muni').append('<option value="'+ e.id_municipio +'">'+ e.nombre +'</option>');
                });

                $('#muni').prop('disabled', false);
            }
        });
    });

    $('#ccaa, #prov, #muni').change(function()
    {
        updateInfo();
    });

    function updateInfo()
    {
        $('#info').empty(); // No acaba de funcionar bé l'empty, si selecciones tot i canvies de comunitat o provincia, segueixen apareixent de vegades les anteriors

        var selecCcaa = $('#ccaa').find('option:selected').text();
        var selecProv = $('#prov').find('option:selected').text();
        var selecMuni = $('#muni').find('option:selected').text();

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
