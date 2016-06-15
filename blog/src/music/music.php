<?php
/**
 * Created by PhpStorm.
 * User: Moon
 * Date: 2014/11/26 0026
 * Time: 2:06
 */
function curl_get($url)
{
    $refer = "http://music.163.com/";
    $header[] = "Cookie: " . "appver=1.5.0.75771;";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_BINARYTRANSFER, true);
    curl_setopt($ch, CURLOPT_REFERER, $refer);
    $output = curl_exec($ch);
    curl_close($ch);
    return $output;
}

function music_search($word, $type)
{
    $url = "http://music.163.com/api/search/pc";
    $post_data = array(
        's' => $word,
        'offset' => '0',
        'limit' => '20',
        'type' => $type,
    );
    $referrer = "http://music.163.com/";
    $URL_Info = parse_url($url);
    $values = [];
    $result = '';
    $request = '';
    foreach ($post_data as $key => $value) {
        $values[] = "$key=" . urlencode($value);
    }
    $data_string = implode("&", $values);
    if (!isset($URL_Info["port"])) {
        $URL_Info["port"] = 80;
    }
    $request .= "POST " . $URL_Info["path"] . " HTTP/1.1\n";
    $request .= "Host: " . $URL_Info["host"] . "\n";
    $request .= "Referer: $referrer\n";
    $request .= "Content-type: application/x-www-form-urlencoded\n";
    $request .= "Content-length: " . strlen($data_string) . "\n";
    $request .= "Connection: close\n";
    $request .= "Cookie: " . "appver=1.5.0.75771;\n";
    $request .= "\n";
    $request .= $data_string . "\n";
    $fp = fsockopen($URL_Info["host"], $URL_Info["port"]);
    fputs($fp, $request);
    $i = 1;
    while (!feof($fp)) {
        if ($i >= 15) {
            $result .= fgets($fp);
        } else {
            fgets($fp);
            $i++;
        }
    }
    fclose($fp);
    return $result;
}

function get_music_info($music_id)
{
    $url = "http://music.163.com/api/song/detail/?id=" . $music_id . "&ids=%5B" . $music_id . "%5D";
    return curl_get($url);
}

function get_artist_album($artist_id, $limit)
{
    $url = "http://music.163.com/api/artist/albums/" . $artist_id . "?limit=" . $limit;
    return curl_get($url);
}

function get_album_info($album_id)
{
    $url = "http://music.163.com/api/album/" . $album_id;
    return curl_get($url);
}

function get_playlist_info($playlist_id)
{
    $url = "http://music.163.com/api/playlist/detail?id=" . $playlist_id;
    return curl_get($url);
}

function get_music_lyric($music_id)
{
    $url = "http://music.163.com/api/song/lyric?os=pc&id=" . $music_id . "&lv=-1&kv=-1&tv=-1";
    return curl_get($url);
}

function get_mv_info()
{
    $url = "http://music.163.com/api/mv/detail?id=319104&type=mp4";
    return curl_get($url);
}

#http://music.163.com/api/artist/歌手id?ext=true&top=50&id=歌手id

#echo music_search("Moon Without The Stars", "1");
#echo get_music_info("28949444");
#echo get_artist_album("166009", "5");
#echo get_album_info("3021064");
#echo get_playlist_info("22320356");
#echo get_music_lyric("29567020");
#echo get_mv_info();
