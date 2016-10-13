// Comsmic object
function Galaxy(id, config){
	/**
	* Id proprety
	*
	*/
	this.id = id;
	/**
	* config proprety
	*
	*/
	this.config = config;

	/**
	* earth property
	*/
	this.earth = new Earth(this.id, this.config);
};