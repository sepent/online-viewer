<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Use correct character set. -->
  <meta charset="utf-8">
  <!-- Tell IE to use the latest, best version. -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!-- Make the application on mobile take up the full browser screen and disable user scaling. -->
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
  <title>User's view</title>
  <!-- CSS for plugins -->
  <!-- <link rel="stylesheet" type="text/css" href="plugins/datepicker/css/bootstrap-datetimepicker.min.css"> -->
  <link rel="stylesheet" type="text/css" href="css/map.css">
</head>
<body>
  <div id="earthContainer">
    
  </div>

  <!-- HTML for filter panel -->
  <div id="filter-container" class="active">
    <button class="btn-show">[x]</button>
    <div class="filter-content">
      <form action="/getuser.php" method="post" id="filter-form">
        <label for="">BundleId:</label>
        <div class="">
          <input type="text" class="ipt" id="txtBundle" name="bundleId">
        </div>

        <label>Start Time:</label>
        <div class="date input-append" id="start-datetimepicker" data-date="12-02-2012">
          <input type="text" class="ipt" id="txtStarttime" name="starttime" data-format="dd/MM/yyyy hh:mm:ss" >
        </div>

        <label>End time:</label>
        <div class="date input-append" id="end-datetimepicker" data-date="12-02-2012">
          <input type="text" class="ipt" id="txtEndtime" name="endtime" data-format="dd/MM/yyyy hh:mm:ss" >
        </div>

        <div><button class="btn">Search</button></div>
      </form>
      <!-- HTML for setting -->
      <div class="setting-panel">
        <div><input type="checkbox" class="cbx" id="cbx-rotation"> <label for="cbx-rotation">Rotation</label></div>
        <div><input type="checkbox" class="cbx" id="cbx-lighting"> <label for="cbx-lighting">Enable lighting</label></div>
      </div>
    </div>
  </div>
  <!-- END HTML for filter panel -->

  <div class="loading-container">Loading...</div>

  <!-- Js for plugins -->
  <script src="plugins/cesium/Build/Cesium/Cesium.js"></script>
  <script src="plugins/jquery/jquery.min.js"></script>
  <!-- <script type="text/javascript" src="plugins/datepicker/js/bootstrap-datetimepicker.min.js"></script> -->

  <script src="js/object/user.js"></script>
  <script src="js/object/earth.js"></script>
  <script src="js/object/galaxy.js"></script>
  <script src="js/init.js"></script>
  <script src="js/event-offline.js"></script>
  <script type="text/javascript" src="js/map.js"></script>

</body>
</html>