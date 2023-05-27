/*
	The legend of Zelda: Tears of the Kingdom Savegame Editor (Horse class) v20230525

	by Marc Robledo 2023
	item names compiled by Echocolat, Exincracci, HylianLZ and Karlos007
*/

function Horse(index, id, name, mane, saddles, reins){
	this.category='horses';
	this.index=index;

	this.id=id;
	this.name=name;
	this.mane=mane;
	this.saddles=saddles;
	this.reins=reins;

	Horse.buildHtmlElements(this);
}
Horse.prototype.getItemTranslation=function(){
	return Horse.TRANSLATIONS[this.id] || this.id;
}
Horse.prototype.save=function(){
	SavegameEditor.writeString64('ArrayHorseIds', this.index, this.id);
	SavegameEditor.writeStringUTF8('ArrayHorseNames', this.index, this.name);
	SavegameEditor.writeU32('ArrayHorseManes', this.index, this.mane);
	SavegameEditor.writeU32('ArrayHorseSaddles', this.index, this.saddles);
	SavegameEditor.writeU32('ArrayHorseReins', this.index, this.reins);
}


Horse.buildHtmlElements=function(item){
	//build html elements
	item._htmlInputName=input('name-'+item.category+'-'+item.index, item.name);
	item._htmlInputName.addEventListener('change', function(){
		var newVal=this.value;
		if(newVal.length>9)
			newVal=newVal.substr(0,9);
		if(!newVal)
			newVal='a';
		item.name=newVal;
	});
	item._htmlInputName.title='马匹名字';
	item._htmlInputName.maxLength=9;

	item._htmlSelectMane=select('horse-mane-'+item.index, Horse.MANES, function(){
		item.mane=this.value;
	}, item.mane);
	item._htmlSelectMane.title='Mane';

	item._htmlSelectSaddles=select('horse-saddles-'+item.index, Horse.SADDLES, function(){
		item.saddles=this.value;
	}, item.saddles);
	item._htmlSelectSaddles.title='Saddles';

	item._htmlSelectReins=select('horse-reins-'+item.index, Horse.REINS, function(){
		item.reins=this.value;
	}, item.reins);
	item._htmlSelectReins.title='Reins';
}

Horse.readAll=function(){
	var horsesIds=SavegameEditor.readString64Array('ArrayHorseIds');
	var validHorses=[];
	for(var i=0; i<horsesIds.length; i++){
		if(horsesIds[i]){
			validHorses.push(new Horse(
				i,
				horsesIds[i],
				SavegameEditor.readStringUTF8('ArrayHorseNames', i),
				SavegameEditor.readU32('ArrayHorseManes', i),
				SavegameEditor.readU32('ArrayHorseSaddles', i),
				SavegameEditor.readU32('ArrayHorseReins', i)
			));
		}
	}
	return validHorses;
}

Horse.HORSE_TYPES=[
	'GameRomHorse00','GameRomHorse01','GameRomHorse02','GameRomHorse03','GameRomHorse04','GameRomHorse05','GameRomHorse06','GameRomHorse07','GameRomHorse08','GameRomHorse09','GameRomHorse10','GameRomHorse11','GameRomHorse12','GameRomHorse13','GameRomHorse14','GameRomHorse15','GameRomHorse16','GameRomHorse17','GameRomHorse18','GameRomHorse19','GameRomHorse20','GameRomHorse21','GameRomHorse22','GameRomHorse23','GameRomHorse25','GameRomHorse26','GameRomHorseEpona','GameRomHorseZelda','GameRomHorse00L','GameRomHorse01L','GameRomHorseGold',

	//untested, posible freeze
	'GameRomHorseSpPattern',
	'GameRomHorseBone',
	'GameRomHorseBone_AllDay',
	'GameRomHorseForStreetVender',
	'GameRomHorseNushi'
];

Horse.MANES=[
	{value:0xb6eede09, name:'无'}, //None
	{value:0xb93d9e3b, name:'鬃毛'}, //Horse_Link_Mane
	{value:0x3a84d601, name:'鬃毛 01'}, //Horse_Link_Mane_01
	{value:0x0bffd92a, name:'鬃毛 02'}, //Horse_Link_Mane_02
	{value:0xe8125091, name:'鬃毛 03'}, //Horse_Link_Mane_03
	{value:0xfdb103b2, name:'鬃毛 04'}, //Horse_Link_Mane_04
	{value:0x75677ada, name:'鬃毛 05'}, //Horse_Link_Mane_05
	{value:0x9cbf81f2, name:'鬃毛 06'}, //Horse_Link_Mane_06
	{value:0x8140f2f9, name:'鬃毛 07'}, //Horse_Link_Mane_07
	{value:0xd749201c, name:'鬃毛 08'}, //Horse_Link_Mane_08
	{value:0xac2a896d, name:'鬃毛 09'}, //Horse_Link_Mane_09
	{value:0x87d9391f, name:'鬃毛 10'}, //Horse_Link_Mane_10
	{value:0xd6a61738, name:'鬃毛 11'}, //Horse_Link_Mane_11
	{value:0x12dd95d6, name:'鬃毛 12'}, //Horse_Link_Mane_12
	{value:0x9cd4f27b, name:'鬃毛 00L'}, //Horse_Link_Mane_00L
	{value:0x55365b10, name:'鬃毛 01L'}, //Horse_Link_Mane_01L
	{value:0xbad4c4a9, name:'鬃毛 00S'} //Horse_Link_Mane_00S
];
Horse.SADDLES=[
	{value:0xb6eede09, name:'无'}, //None
	{value:0x8573ae34, name:'马鞍 00'}, //GameRomHorseSaddle_00
	{value:0x04c6c17b, name:'马鞍 01'}, //GameRomHorseSaddle_01
	{value:0x47d0c84e, name:'马鞍 02'}, //GameRomHorseSaddle_02
	{value:0xaeab565a, name:'马鞍 03'}, //GameRomHorseSaddle_03
	{value:0xcf167805, name:'马鞍 04'}, //GameRomHorseSaddle_04
	{value:0x6e2db559, name:'马鞍 05'}, //GameRomHorseSaddle_05
	{value:0x7feaa5c0, name:'马鞍 06'}, //GameRomHorseSaddle_06
	{value:0xb926ed8b, name:'马鞍 07'}, //GameRomHorseSaddle_07
	{value:0xf1435392, name:'马鞍 00L'}, //GameRomHorseSaddle_00L
	{value:0x8c5bd272, name:'马鞍 00S'} //GameRomHorseSaddle_00S
];
Horse.REINS=[
	{value:0xb6eede09, name:'无'}, //None
	{value:0x1864234b, name:'缰绳 00'}, //GameRomHorseReins_00
	{value:0x094f807a, name:'缰绳 01'}, //GameRomHorseReins_01
	{value:0xe54abe55, name:'缰绳 02'}, //GameRomHorseReins_02
	{value:0x0200441d, name:'缰绳 03'}, //GameRomHorseReins_03
	{value:0x85610de7, name:'缰绳 04'}, //GameRomHorseReins_04
	{value:0xbdc6a58b, name:'缰绳 05'}, //GameRomHorseReins_05
	{value:0x79c2c72f, name:'缰绳 06'}, //GameRomHorseReins_06
	{value:0x4dbf2061, name:'缰绳 00L'}, //GameRomHorseReins_00L
	{value:0xe8fe6ab7, name:'缰绳 00S'} //GameRomHorseReins_00S
];







Horse.TRANSLATIONS=(function(horseTypes){
	var names={};
	horseTypes.forEach(function(id, i){
		names[id]=id.replace('GameRom', '').replace('Horse', 'Horse ');
	});
	return names;
}(Horse.HORSE_TYPES));