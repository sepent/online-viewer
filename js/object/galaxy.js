/*----------------------------------------------------
* Filename: galaxy.js
* Author: Akademia
* Date: YYYY/MM/DD
* Description: This file contain galaxy object, which is higher level
* ----------------------------------------------------
*/

function Galaxy(container, config){
	//--------------------------------------------------
  	// id property
  	// this is id of element in HTML
  	//--------------------------------------------------
	this.container = container;

	//--------------------------------------------------
  	// config property
  	// The config json data
  	//--------------------------------------------------
	this.config = config;

	//--------------------------------------------------
  	// earth property
  	// It is earth object, which is show on view
  	//--------------------------------------------------
	this.earth = new Earth(this.container, this.config);
};