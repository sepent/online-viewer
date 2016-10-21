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
        <link rel="stylesheet" type="text/css" href="plugins/datepicker/jquery.datetimepicker.css">
        <!--  CSS for bottrap -->
        <link rel="stylesheet" type="text/css" href="plugins/bootstrap/css/bootstrap.min.css">
        <!-- <link rel="stylesheet" type="text/css" href="plugins/bootstrap/color/jquery.minicolors.css"> -->
        <link rel="stylesheet" type="text/css" href="plugins/colorpicker/css/bootstrap-colorpicker.min.css">

        <!-- CSS for customize and handle -->
        <link rel="stylesheet" type="text/css" href="css/map.css">
        <link rel="stylesheet" type="text/css" href="css/filter.css">
    </head>
    <body>
        <div id="earthContainer"></div>

        <!-- HTML for filter panel -->
        <div id="panel-container" class="active">
            <button class="btn-show"><i class="glyphicon glyphicon-chevron-left"></i></button>

            <div id="filter-panel">
                <div class="filter-content">
                    <!-- <form action="getuser.php" method="post" id="filter-form">
                        <label for="">BundleId:</label>
                        <input type="text" class="ipt" id="txtBundle" name="bundleId">

                        <label>Start Time:</label>
                        <input type="text" class="ipt" id="txtStarttime" name="starttime" data-format="dd/MM/yyyy hh:mm:ss" >

                        <label>End time:</label>
                        <input type="text" class="ipt" id="txtEndtime" name="endtime" data-format="dd/MM/yyyy hh:mm:ss" >

                        <label>Device type:</label>
                        <input type="text" class="ipt" id="txtDevicetype" name="deviceType" >

                        <label>Event flatform:</label>
                        <input type="text" class="ipt" id="txtDeviceFlatform" name="deviceFlatform">

                        <div><button class="btn">Search</button></div>
                        <div class="counter"></div>
                    </form>-->

                    <!-- HTML for setting -->
                    <!-- <div class="setting-panel">
                        <a href="javascript: void(0)" class="btn-show-more-setting">Show more settings</a>
                        <div class="more-setting">
                            <label for="">Rotational speed:</label>
                            <input type="text" class="ipt" id="txtRotation" name="txtRotation">
                            <div><input type="checkbox" class="cbx" id="cbx-rotation"> <label for="cbx-rotation">Rotation</label></div>
                            <div><input type="checkbox" class="cbx" id="cbx-lighting"> <label for="cbx-lighting">Enable lighting</label></div>
                            <div><input type="checkbox" class="cbx" id="cbx-fullscreen"> <label for="cbx-fullscreen">Full sreen button</label></div>
                            <div><input type="checkbox" class="cbx" id="cbx-infobox"> <label for="cbx-infobox">Info box</label></div>
                            <div><input type="checkbox" class="cbx" id="cbx-animation"> <label for="cbx-animation">Animation</label></div>
                        </div>
                    </div> -->
                    <ul class="list-group">
                        <li id="message-filter">No filter is setted</li>
                    </ul>
                </div>
                <div class="filter-controls">
                    <div class="btn-group" style="width: 100%">
                        <button class="btn btn-primary add-filter-btn"  type="button" data-toggle="modal" data-target="#filterModal" style="width: 50%"><i class="glyphicon glyphicon-edit"></i> Add filter</button>
                        <button class="btn btn-default reload-filter-btn"  type="button" style="width: 50%"><i class="glyphicon glyphicon-refresh"></i> Reload</button>
                    </div>
                </div>
            </div>

            <!-- HTML for user list -->
            <div id="event-panel">
                <div class="event-content">
                    <ul class="list-group"></ul>
                </div>
            </div>
        </div>
        <!-- END HTML for filter panel -->

        

        <div class="loading-container">Loading...</div>

        <!-- Model add new filter -->
        <div class="modal fade adding-filter-box" id="filterModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel"><i class="glyphicon glyphicon-edit"></i> Add new filter</h4>
                    </div>
                    <div class="modal-body">
                        <form action="" method="post" id="filter-form">
                            <input type="hidden" name="id" value="">
                            <input type="hidden" name="checked" value="true">
                            <div class="row">
                                <div class="col-md-12">
                                    <div id="filter-color" class="input-group colorpicker-component">
                                        <input type="text" value="rgba(1,1,1,1)" class="form-control" name="color"/>
                                        <span class="input-group-addon"><i></i></span>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <label for="txtFiltername">Filter's name:</label>
                                    <input type="text" class="form-control" id="txtFiltername" name="filterName">
                                </div>
                                <div class="col-md-12">
                                    <label for="txtBundle">BundleId:</label>
                                    <input type="text" class="form-control" id="txtBundle" name="bundleId">
                                </div>
                                <div class="col-md-12">
                                    <label for="txtStarttime">Start Time:</label>
                                    <input type="text" class="form-control" id="txtStarttime" name="starttime" data-format="dd/MM/yyyy hh:mm:ss" >
                                </div>
                                <div class="col-md-12">
                                    <label for="txtEndtime">End time:</label>
                                    <input type="text" class="form-control" id="txtEndtime" name="endtime" data-format="dd/MM/yyyy hh:mm:ss" >
                                </div>

                                <div class="col-md-12">
                                    <label for="txtDevicetype">Device type:</label>
                                    <input type="text" class="form-control" id="txtDevicetype" name="deviceType" >
                                </div>

                                <div class="col-md-12">
                                    <label for="txtDeviceFlatform">Event Platform:</label>
                                    <input type="text" class="form-control" id="txtDeviceFlatform" name="deviceFlatform">
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary btn-save">Save changes</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Js for plugins -->
        <script src="plugins/cesium/Build/Cesium/Cesium.js"></script>
        <script src="plugins/jquery/jquery.min.js"></script>
        <script src="plugins/jquery/jquery.cookie.js"></script>
        <script src="plugins/datepicker/jquery.datetimepicker.full.min.js"></script>
        <!-- Js for bootstrap -->
        <script src="plugins/bootstrap/js/bootstrap.min.js"></script>
        <!-- <script src="plugins/bootstrap/color/jquery.minicolors.min.js"></script> -->
        <script src="plugins/colorpicker/js/bootstrap-colorpicker.min.js"></script>
        <!-- Js for customize and handle -->
        <script src="js/object/user.js"></script>
        <script src="js/object/earth.js"></script>
        <script src="js/object/galaxy.js"></script>
        
        <script src="js/init.js"></script>
        <script src="js/event.js"></script>
        <script src="js/function.js"></script>
        <script type="text/javascript">
</script>
    </body>
</html>