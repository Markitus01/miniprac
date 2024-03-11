<?php 
//Indicar els valors per el següents paràmetres segons la configuració de cada usuari
$host="127.0.0.1"; 
$username="root";  
$password="";
$db_name="m06_uf4_provincies"; 
$con=mysqli_connect("$host", "$username", "$password","$db_name");
$sql  ="";

//$sql = "SELECT c.nombre 'cominidad', p.provincia,m.nombre as'municipi' from comunidades c JOIN provincias p on (c.id_comunidad = p.id_comunidad) JOIN municipios m ON(m.id_provincia = p.id_provincia)";
if(isset($_POST['inici']))
{
    $sql = "SELECT id_comunidad, nombre from comunidades";
}

if(isset($_POST['comunitats']))
{
    $comunitats = $_POST['comunitats'];
    
    $sql = "SELECT id_provincia, provincia FROM provincias where id_comunidad = ".$comunitats;
}

if(isset($_POST['provincies']))
{
    $provincies = $_POST['provincies'];
    $sql = "SELECT id_municipio,nombre FROM municipios where id_provincia = ".$provincies;
}

$result = $con->query($sql);
$rows = array();

while($row=mysqli_fetch_array($result))
{
    $rows[]=$row;
}
//var_dump(converteArrayParaUtf8($rows));

echo json_encode(converteArrayParaUtf8($rows));


// funció per visualitzar bé els accents
function converteArrayParaUtf8($result){
    array_walk_recursive($result, function(&$item,$key){
        if (!mb_detect_encoding($item, 'utf-8', true)) {
                $item = utf8_encode($item);
            }
    });
    return $result;
}