<?php
$mysqli = new mysqli("sip.uidesk.id","root","Zimam@030622!!","asteriskcdrdb");
/*

user : root
pass : zimam@0306!!
user : uidesk
pass : Uidesk123!
*/
// Check connection
if ($mysqli -> connect_errno) {
  echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
  exit();
}

$add_query="AND (datetime BETWEEN '".date('Y-m-d')." 00:00:00' AND '".date('Y-m-d')." 23:59:59')";
/*$result = $mysqli -> query("SELECT
  qstats.reportmonthly.labelreport as lastapp,DAY(datetime) AS hari,
  COUNT(jumlah) AS total_data,SUM(Seconds) as Seconds from(
select event,datetime,real_uniqueid as jumlah,0 Seconds from qstats.queue_stats_mv where (queue='60012' or queue='60011') 
union
select disposition as event,calldate,uniqueid as jumlah,0 AS seconds from asteriskcdrdb.cdr where dst in ('60012','60011')
union
select 'CONNECTA' as event,calldate,uniqueid as jumlah,billsec AS seconds from asteriskcdrdb.cdr where dst in ('60012','60011')
union
select 'CALLWITHIN',datetime,real_uniqueid as jumlah,0 Seconds from qstats.queue_stats_mv where (queue='60012' or queue='60011') and event in ('COMPLETECALLER','COMPLETEAGENT') and ringtime <=20
union
select 'ENTERQUEUENEW',calldate,uniqueid as jumlah,0 Seconds from asteriskcdrdb.cdr where dst in ('60012','60011') and dstchannel=''
union
select a.event,a.datetime,a.uniqueid as jumlah,(SELECT g.duration FROM asteriskcdrdb.cdr g WHERE g.uniqueid = a.uniqueid and g.disposition='ANSWERED' ORDER BY uniqueid DESC LIMIT 1) AS Seconds from qstats.queue_stats_full a where a.qname in ('2','3')
union
select 'EARLY',calldate,uniqueid as jumlah,0 Seconds from asteriskcdrdb.cdr where disposition in ('NO ANSWER') and dst in ('60012','60011') and duration between '0' and '9'
union
SELECT 'TOTALCALL',calldate,uniqueid as jumlah,0 Seconds FROM asteriskcdrdb.cdr 
    WHERE  (duration-billsec) >=0 
   AND substring(dstchannel,1,locate('-',dstchannel,length(dstchannel)-8)-1)
   in ('SIP/10010','SIP/10011','SIP/10012','SIP/10013','SIP/10014','SIP/10015','SIP/10016',
   'SIP/10017','SIP/10018','SIP/10019','SIP/10020','SIP/10021','SIP/10022','SIP/10023','SIP/10024','SIP/10025','SIP/10026','SIP/10027','SIP/10028','SIP/10029')
union
select 'EARLY',curdate(),1 as jumlah,0 Seconds
) as a left outer join qstats.reportmonthly on qstats.reportmonthly.event_id=a.event WHERE
  datetime !='' and labelreport !='' ".$add_query."
GROUP BY
  DAY(datetime),qstats.reportmonthly.labelreport
ORDER BY
  qstats.reportmonthly.urutan,DAY(datetime);");*/

 // $data = [];
//while ($row = $result->fetch_assoc()) {
   
  //  $data['DataDetail'][] = $row;
//}
$sql = " SELECT
  qstats.reportmonthly.labelreport as lastapp,DAY(datetime) AS hari,
  COUNT(jumlah) AS total_data,SUM(Seconds) as Seconds from(
select event,datetime,real_uniqueid as jumlah,0 Seconds from qstats.queue_stats_mv where (queue='60012' or queue='60011') 
union
select disposition as event,calldate,uniqueid as jumlah,0 AS seconds from asteriskcdrdb.cdr where dst in ('60012','60011')
union
select 'CONNECTA' as event,calldate,uniqueid as jumlah,billsec AS seconds from asteriskcdrdb.cdr where dst in ('60012','60011')
union
select 'CALLWITHIN',datetime,real_uniqueid as jumlah,0 Seconds from qstats.queue_stats_mv where (queue='60012' or queue='60011') and event in ('COMPLETECALLER','COMPLETEAGENT') and ringtime <=20
union
select 'ENTERQUEUENEW',calldate,uniqueid as jumlah,0 Seconds from asteriskcdrdb.cdr where dst in ('60012','60011') and dstchannel=''
union
select a.event,a.datetime,a.uniqueid as jumlah,(SELECT g.duration FROM asteriskcdrdb.cdr g WHERE g.uniqueid = a.uniqueid and g.disposition='ANSWERED' ORDER BY uniqueid DESC LIMIT 1) AS Seconds from qstats.queue_stats_full a where a.qname in ('2','3')
union
select 'EARLY',calldate,uniqueid as jumlah,0 Seconds from asteriskcdrdb.cdr where disposition in ('NO ANSWER') and dst in ('60012','60011') and duration between '0' and '9'
union
SELECT 'TOTALCALL',calldate,uniqueid as jumlah,0 Seconds FROM asteriskcdrdb.cdr 
    WHERE  (duration-billsec) >=0 
   AND substring(dstchannel,1,locate('-',dstchannel,length(dstchannel)-8)-1)
   in ('SIP/10010','SIP/10011','SIP/10012','SIP/10013','SIP/10014','SIP/10015','SIP/10016',
   'SIP/10017','SIP/10018','SIP/10019','SIP/10020','SIP/10021','SIP/10022','SIP/10023','SIP/10024','SIP/10025','SIP/10026','SIP/10027','SIP/10028','SIP/10029')
union
select 'EARLY',curdate(),1 as jumlah,0 Seconds
) as a left outer join qstats.reportmonthly on qstats.reportmonthly.event_id=a.event WHERE
  datetime !='' and labelreport !='' ".$add_query."
GROUP BY
  DAY(datetime),qstats.reportmonthly.labelreport
ORDER BY
  qstats.reportmonthly.urutan,DAY(datetime);";
$result = $mysqli->query($sql);

// Check if the query was successful
if ($result) {
    // Fetch the result set as an associative array
    $query_fetch = [];
    while ($row = $result->fetch_assoc()) {
        $query_fetch[] = $row;
    }
	
	//echo json_encode($query_fetch);
	//die();

    // Free result set
    $result->free_result();

    // Close connection
    $mysqli->close();
} else {
    echo "Error in query: " . $mysqli->error;
}

$datas = [];
$seconds = [];
foreach ($query_fetch as $key => $data) {
    $datas[$data['lastapp']][$data['hari']] = $data['total_data'] ?? 0;
    $seconds[$data['lastapp']][$data['hari']] = $data['Seconds'] ?? 0;
}
$data = [];
for ($i=date('j'); $i <= date('j'); $i++) { 
 
  $datas['Call Answered'][$i] = $datas['Call Answered'][$i] ?? 0;
$datas['Call Answered Within'][$i] = $datas['Call Answered Within'][$i] ?? 0;
  $datas['Total Call'][$i] = $datas['Total Call'][$i] ?? 0;
  $datas['Abnd. Ringing'][$i] = $datas['Abnd. Ringing'][$i] ?? 0;
  $datas['Abnd. Transfer'][$i] = $datas['Abnd. Transfer'][$i] ?? 0;
  $datas['Abnd. Queue'][$i] = $datas['Abnd. Queue'][$i] ?? 0;
  $datas['ivr terminated'][$i] = $datas['ivr terminated'][$i] ?? 0;
  $datas['early abandoned'][$i] = $datas['early abandoned'][$i] ?? 0;

  $datas['SCR'][$i] = round((($datas['Call Answered'][$i] > 0)? ($datas['Call Answered'][$i] / $datas['Total Call'][$i]) : 0), 2)*100;

  $datas['Service Level'][$i] = round((($datas['Call Answered Within'][$i] > 0)? ($datas['Call Answered Within'][$i] / $datas['Total Call'][$i]) : 0), 2)*100;

  //$datas['Service Level'][$i] = round((($datas['Call Answered Within'][$i] > 0)? ($datas['Call Answered Within'][$i] / ($datas['Total Call'][$i] - 
  //                                    $datas['Abnd. Ringing'][$i] - 
  //                                    $datas['Abnd. Transfer'][$i] -
  //                                    $datas['ivr terminated'][$i] - 
  //                                    $datas['early abandoned'][$i])) : 0), 2);
  // $datas['FTE Actual'][$i] = round((($datas['Call Answered'][$i] > 0)? ($datas['Call Answered'][$i] / ($datas['Total Call'][$i] - 
  //                                     $datas['Abnd. Ringing'][$i] - 
  //                                     $datas['Abnd. Transfer'][$i] -
  //                                     $datas['ivr terminated'][$i] - 
  //                                     $datas['early abandoned'][$i])) : 0), 2);

$datas['FTE Actual'][$i] = 0;
$aht = ($datas['Call Answered'][$i] > 0)? round(($seconds['Call Answered'][$i] ?? 0) / $datas['Call Answered'][$i], 2) : 0;
  $datas['Average Handling Time (AHT)'][$i] = $aht;
  $datas['Idle rate %'][$i] = 0;
  $datas['CSAT'][$i] = 0;

  
}
$data['DataDetail'][] = $datas;
echo json_encode($data);
?>