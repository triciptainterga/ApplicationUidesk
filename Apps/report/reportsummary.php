<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title> Roatex Report Summary Monthly</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
</head>
<body>
    <nav class="navbar bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                Roatex Report Summary Monthly
            </a>
        </div>
    </nav>
    <div class="card card-body">
            <form action="" method="get">
                <div class="row mb-3">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="">Start</label>
                            <input type="date" name="start_date" value="<?= $_GET['start_date'] ?? "" ?>" class="form-control">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="">End</label>
                            <input type="date" name="end_date" value="<?= $_GET['end_date'] ?? "" ?>" class="form-control">
                        </div>
                    </div>
                </div>
                <div class="input-group">
                   
                    <button class="btn btn-outline-secondary" type="submit" id="button-addon2">Search</button>
                </div>
            </form>
        </div>
<?php
$add_query = "";

if(isset($_GET['start_date']) && !empty($_GET['start_date']) && isset($_GET['end_date']) && !empty($_GET['end_date'])) $add_query .= " AND (calldate BETWEEN '".$_GET['start_date']."' AND '".$_GET['end_date']." 23:59:59')";
// echo $add_query;
// die;
// Your data
/*
$jsonData='[
	{
		"disposition" : "ANSWERED",
		"hari" : 5,
		"total_data" : 9
	},
	{
		"disposition" : "BUSY",
		"hari" : 5,
		"total_data" : 8
	},
	{
		"disposition" : "NO ANSWER",
		"hari" : 5,
		"total_data" : 1
	},
	{
		"disposition" : "ANSWERED",
		"hari" : 6,
		"total_data" : 20
	},
	{
		"disposition" : "BUSY",
		"hari" : 6,
		"total_data" : 3
	},
	{
		"disposition" : "NO ANSWER",
		"hari" : 6,
		"total_data" : 20
	},
	{
		"disposition" : "ANSWERED",
		"hari" : 7,
		"total_data" : 14
	},
	{
		"disposition" : "NO ANSWER",
		"hari" : 7,
		"total_data" : 6
	},
	{
		"disposition" : "ANSWERED",
		"hari" : 11,
		"total_data" : 44
	},
	{
		"disposition" : "BUSY",
		"hari" : 11,
		"total_data" : 1
	},
	{
		"disposition" : "NO ANSWER",
		"hari" : 11,
		"total_data" : 14
	},
	{
		"disposition" : "ANSWERED",
		"hari" : 12,
		"total_data" : 165
	},
	{
		"disposition" : "BUSY",
		"hari" : 12,
		"total_data" : 39
	},
	{
		"disposition" : "CONGESTION",
		"hari" : 12,
		"total_data" : 606
	},
	{
		"disposition" : "NO ANSWER",
		"hari" : 12,
		"total_data" : 87
	},
	{
		"disposition" : "ANSWERED",
		"hari" : 13,
		"total_data" : 72
	},
	{
		"disposition" : "BUSY",
		"hari" : 13,
		"total_data" : 5
	},
	{
		"disposition" : "CONGESTION",
		"hari" : 13,
		"total_data" : 260
	},
	{
		"disposition" : "NO ANSWER",
		"hari" : 13,
		"total_data" : 19
	},
	{
		"disposition" : "ANSWERED",
		"hari" : 14,
		"total_data" : 38
	},
	{
		"disposition" : "BUSY",
		"hari" : 14,
		"total_data" : 84
	},
	{
		"disposition" : "CONGESTION",
		"hari" : 14,
		"total_data" : 576
	},
	{
		"disposition" : "NO ANSWER",
		"hari" : 14,
		"total_data" : 9
	},
	{
		"disposition" : "ANSWERED",
		"hari" : 15,
		"total_data" : 24
	},
	{
		"disposition" : "CONGESTION",
		"hari" : 15,
		"total_data" : 16
	},
	{
		"disposition" : "ANSWERED",
		"hari" : 17,
		"total_data" : 11
	},
	{
		"disposition" : "CONGESTION",
		"hari" : 17,
		"total_data" : 18
	},
	{
		"disposition" : "NO ANSWER",
		"hari" : 17,
		"total_data" : 2
	},
	{
		"disposition" : "ANSWERED",
		"hari" : 18,
		"total_data" : 25
	},
	{
		"disposition" : "BUSY",
		"hari" : 18,
		"total_data" : 4
	},
	{
		"disposition" : "CONGESTION",
		"hari" : 18,
		"total_data" : 24
	},
	{
		"disposition" : "ANSWERED",
		"hari" : 19,
		"total_data" : 42
	},
	{
		"disposition" : "CONGESTION",
		"hari" : 19,
		"total_data" : 148
	},
	{
		"disposition" : "NO ANSWER",
		"hari" : 19,
		"total_data" : 12
	},
	{
		"disposition" : "ANSWERED",
		"hari" : 20,
		"total_data" : 37
	},
	{
		"disposition" : "BUSY",
		"hari" : 20,
		"total_data" : 8
	},
	{
		"disposition" : "CONGESTION",
		"hari" : 20,
		"total_data" : 122
	},
	{
		"disposition" : "NO ANSWER",
		"hari" : 20,
		"total_data" : 14
	},
	{
		"disposition" : "ANSWERED",
		"hari" : 21,
		"total_data" : 12
	},
	{
		"disposition" : "CONGESTION",
		"hari" : 21,
		"total_data" : 10
	},
	{
		"disposition" : "ANSWERED",
		"hari" : 22,
		"total_data" : 27
	},
	{
		"disposition" : "CONGESTION",
		"hari" : 22,
		"total_data" : 10
	},
	{
		"disposition" : "NO ANSWER",
		"hari" : 22,
		"total_data" : 1
	}
]';
*/
// Connection to the database
$mysqli = new mysqli("sip.uidesk.id","root","zimam@0306!!","asteriskcdrdb");

// Check connection
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

// Your SQL query and (dst <> '6003' and dst <> '6004') (dst !='6003' and dst !='6004')
//where (YEAR(calldate) > '2022' and recordingfile != '') AND (dst !='6003' and dst !='6004')  AND disposition != 'CONGESTION'
$sql = "SELECT
          dcontext as lastapp,DAY(calldate) AS hari,
          COUNT(*) AS total_data
        FROM
          asteriskcdrdb.cdr
        WHERE
          calldate !='' AND (dcontext<>'To-Kanmo' AND dcontext<>'sub-pincheck' AND dcontext<>'ext-group' AND dcontext<>'app-blackhole') ".$add_query."
        GROUP BY
          DAY(calldate),dcontext
        ORDER BY
          DAY(calldate);";
$result = $mysqli->query($sql);

// Check if the query was successful
if ($result) {
    // Fetch the result set as an associative array
    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    // Free result set
    $result->free_result();

    // Close connection
    $mysqli->close();

    // Convert the array to JSON
    $jsonResult = json_encode($data);

    // Output the JSON string
    //echo $jsonResult;
} else {
    echo "Error in query: " . $mysqli->error;
}


$data = json_decode($jsonResult, true);

// Initialize an empty result array
$result = [];

// Loop through the data to group and pivot
foreach ($data as $entry) {
    $disposition = $entry["lastapp"];
    $hari = $entry["hari"];
    $totalData = $entry["total_data"];

    // Check if the disposition key exists in the result array
    if (!array_key_exists($disposition, $result)) {
        $result[$disposition] = [];
    }

    // Check if the hari key exists in the disposition array
    if (!array_key_exists($hari, $result[$disposition])) {
        $result[$disposition][$hari] = 0;
    }

    // Sum the total_data for each hari on a given disposition
    $result[$disposition][$hari] += $totalData;
}

// Display the result in an HTML table
echo "<div class='mt-3'></div><table class='table table-bordered'>";
echo "<thead><tr><th>Disposition</th><th>Tgl 1</th><th>Tgl 2</th><th>Tgl 3</th><th>Tgl 4</th><th>Tgl 5</th><th>Tgl 6</th><th>Tgl 7</th><th>Tgl 8</th><th>Tgl 9</th><th>Tgl 10</th><th>Tgl 11</th><th>Tgl 12</th><th>Tgl 13</th><th>Tgl 14</th>
<th>Tgl 15</th><th>Tgl 16</th><th>Tgl 17</th><th>Tgl 18</th><th>Tgl 19</th><th>Tgl 20</th><th>Tgl 21</th><th>Tgl 22</th><th>Tgl 23</th><th>Tgl 24</th><th>Tgl 25</th>
<th>Tgl 26</th><th>Tgl 27</th><th>Tgl 28</th><th>Tgl 29</th><th>Tgl 30</th><th>Tgl 31</th></tr></thead>";


foreach ($result as $disposition => $haris) {
    if($disposition=="from-internal"){
        $disposition="* Answered";
    }else if($disposition=="TO-ROTEK"){
        $disposition="* Agent Outgoing Call";
    }else if($disposition=="ext-queues"){
        $disposition="* IVR Response";
    }else if($disposition=="Playback"){
        $disposition="Abandoned";
        /*
        field dcontext='app-announcement-3';
        Jika lastapp itu Playback kemudian dcontext itu app-announcement-3 dan dst s maka dia Abandoned diluar jam kerja
        */
    }
    
    if($disposition=="app-announcement-3"){
        $disposition="* Abandoned-After hours";
    }else if($disposition=="BackGround"){
        $disposition="Customer Dropped on IVR";
    }
    echo "<tbody><tr>";
    echo "<td>{$disposition}</td>";
    echo "<td>{$haris['1']}</td>";
    echo "<td>{$haris['2']}</td>";
    echo "<td>{$haris['3']}</td>";
    echo "<td>{$haris['4']}</td>";
    echo "<td>{$haris['5']}</td>";
    echo "<td>{$haris['6']}</td>";
    echo "<td>{$haris['7']}</td>";
    echo "<td>{$haris['8']}</td>";
    echo "<td>{$haris['9']}</td>";
    echo "<td>{$haris['10']}</td>";
    echo "<td>{$haris['11']}</td>";
    echo "<td>{$haris['12']}</td>";
    echo "<td>{$haris['13']}</td>";
    echo "<td>{$haris['14']}</td>";
    echo "<td>{$haris['15']}</td>";
    echo "<td>{$haris['16']}</td>";
    echo "<td>{$haris['17']}</td>";
    echo "<td>{$haris['18']}</td>";
    echo "<td>{$haris['19']}</td>";
    echo "<td>{$haris['20']}</td>";
    echo "<td>{$haris['21']}</td>";
    echo "<td>{$haris['22']}</td>";
    echo "<td>{$haris['23']}</td>";
    echo "<td>{$haris['24']}</td>";
    echo "<td>{$haris['25']}</td>";
    echo "<td>{$haris['26']}</td>";
    echo "<td>{$haris['27']}</td>";
    echo "<td>{$haris['28']}</td>";
    echo "<td>{$haris['29']}</td>";
    echo "<td>{$haris['30']}</td>";
    echo "<td>{$haris['31']}</td>";
    
    echo "</tr> </tbody>";
}

echo "</table>";

?>
</body>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
    
</html>