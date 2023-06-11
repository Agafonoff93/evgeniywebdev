<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

$title = "Тема письма";
$file = $_FILES['file'];

$c = true;
// Формирование самого письма
$title = "Заголовок письма";
foreach ( $_POST as $key => $value ) {
  if ( $value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject" ) {
    $body .= "
    " . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
      <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
      <td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
    </tr>
    ";
  }
}

$body = "<table style='width: 100%;'>$body</table>";

// данные для отправки сообщения в Telegram бот
$bot_token = '6148575415:AAFrCu8ey6XpDdd9PTdNcy_YERSRLfC27yk';
$chat_id = '-976771693';

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
  $mail->isSMTP();
  $mail->CharSet = "UTF-8";
  $mail->SMTPAuth   = true;

  // Настройки вашей почты
  $mail->Host       = 'smtp.gmail.com'; // SMTP сервера вашей почты
  $mail->Username   = 'agafonoff93k1@gmail.com'; // Логин на почте
  $mail->Password   = 'xehvjejfakebbxgk'; // Пароль на почте
  $mail->SMTPSecure = 'ssl';
  $mail->Port       = 465;

  $mail->setFrom('agafonoff93k1@gmail.com', 'Заявка с вашего сайта'); // Адрес самой почты и имя отправителя

  // Получатель письма
  $mail->addAddress('agafonoff93k1@gmail.com');
  $mail->addAddress('agafonoff93@yandex.ru');

  // Прикрипление файлов к письму
  if (!empty($file['name'][0])) {
    for ($ct = 0; $ct < count($file['tmp_name']); $ct++) {
      $uploadfile = tempnam(sys_get_temp_dir(), sha1($file['name'][$ct]));
      $filename = $file['name'][$ct];
      if (move_uploaded_file($file['tmp_name'][$ct], $uploadfile)) {
          $mail->addAttachment($uploadfile, $filename);
          $rfile[] = "Файл $filename прикреплён";
      } else {
          $rfile[] = "Не удалось прикрепить файл $filename";
      }
    }
  }

  // Отправка сообщения
  $mail->isHTML(true);
  $mail->Subject = $title;
  $mail->Body = $body;
  // отправляем сообщение в Telegram бот
  // $url = "https://api.telegram.org/bot{$bot_token}/sendMessage";
  // $data = [
  //       'chat_id' => $chat_id,
  //       'text' => 'Заявка от: ' . $mail->From . "\nSubject: " . $mail->Subject
  //   ];
  //   $options = [
  //   'http' => [
  //       'method' => 'POST',
  //       'header' => 'Content-type: application/x-www-form-urlencoded',
  //       'content' => http_build_query($data)
  //   ]
  // ];
  // $context = stream_context_create($options);
  // $result = file_get_contents($url, false, $context);
  // отправляем сообщение в Telegram бот
// $url = "https://api.telegram.org/bot{$bot_token}/sendMessage";
// $data = [
//     'chat_id' => $chat_id,
//     'text' => $body
// ];
// $options = [
//     'http' => [
//         'method' => 'POST',
//         'header' => 'Content-type: application/x-www-form-urlencoded',
//         'content' => http_build_query($data)
//     ]
// ];
// $context = stream_context_create($options);
// $result = file_get_contents($url, false, $context);

// Формирование текста сообщения в HTML-формате
$message = "<b>Новая заявка:</b>\n\n";
foreach ($_POST as $key => $value) {
    if ($key !== "project_name" && $key !== "admin_email" && $key !== "form_subject" && !empty($value)) {
        $message .= "<b>{$key}:</b> {$value}\n";
    }
}
// Отправка файла, если он был загружен
if (!empty($_FILES['file']['name'][0])) {
    $file_id = sendFileToTelegram($_FILES['file']['tmp_name'][0], $_FILES['file']['name'][0]);
    $message .= "\n<b>Прикрепленный файл:</b> <a href='https://telegram.me/{BOT_USERNAME}?start=file_{$file_id}'>{$_FILES['file']['name'][0]}</a>";
}

// Отправка сообщения в Telegram
$telegram_url = "https://api.telegram.org/bot{$bot_token}/sendMessage";
$telegram_params = [
    'chat_id' => $chat_id,
    'text' => $message,
    'parse_mode' => 'HTML'
];
$telegram_options = [
    'http' => [
        'method' => 'POST',
        'header' => 'Content-type: application/x-www-form-urlencoded',
        'content' => http_build_query($telegram_params)
    ]
];
$telegram_context = stream_context_create($telegram_options);
$result = file_get_contents($telegram_url, false, $telegram_context);




  $mail->send();

} catch (Exception $e) {
  $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}
