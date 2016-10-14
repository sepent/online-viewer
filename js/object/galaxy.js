//--------------------------------------------------
// Galaxy.js file
// 
// This file contain galaxy object, which is higher level
//--------------------------------------------------

function Galaxy(id, config){
	//--------------------------------------------------
  	// id property
  	// this is id of element in HTML
  	//--------------------------------------------------
	this.id = id;

	//--------------------------------------------------
  	// config property
  	// The config json data
  	//--------------------------------------------------
	this.config = config;

	//--------------------------------------------------
  	// earth property
  	// It is earth object, which is show on view
  	//--------------------------------------------------
	this.earth = new Earth(this.id, this.config);
};