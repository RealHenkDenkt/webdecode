<?php 

$file = "js/strongs-hebrew-spellings.dic";

if (!file_exists($file)) die('File does not exist');

$handle = fopen($file, 'r');

$result = [];

if ($handle) {
    while (($line  = fgets($handle)) !== false) {
//        echo $line."\n";
        $split = explode("|", $line, 3);
//        var_dump($split);
        if (isset($split[1])) {
           $word = str_replace("\n","",$split[2]);
           // $word = $split[2];
            
            $result[] = [
                'trans' => $split[1],
                'word' => $word,
                'number' => $split[0]
            ];
        } else {
            $result[$split[0]] = ['trans' => '', 'word' => ''];
        }

    }
}
$newFile = fopen('hebrew-dict.json', 'w');
//$string = 'let HebrewDict = ' . json_encode($result) . ';';
fwrite($newFile, json_encode($result));
fclose($newFile);

//echo json_encode($result);
