
const log = (...args) => {
    console.log(...args);
};

// String.toTitle()
String.prototype.toTitle = function() {
    return this
	.toLowerCase()
        .replace(/^(.)/, function($1) { return $1.toUpperCase(); });
}

log("Initializing app...");

function zip (keys, values) {
    if ( keys.length !== values.length ) {
	log("Failed", keys, values );
	throw new Error(`keys and values length are not the same: ${keys.length} === ${values.length}`);
    }
    
    return keys.reduce( (obj, k, i) => {
	obj[k]		= values[i];
	return obj;
    }, {});
}

//
// Core Manual
//


// Units

const units = {
    "stat_names": ["Name","M","WS","BS","S","T","W","A","Ld","Sv","Max","Point Cost","Armed with","Replacements"],
    "unit_stats": [
	["Scout",			6,3,3,4,4,1,1,7,4,null,10,[
	    "boltgun","bolt pistol","frag grenades","krak grenades"
	],[
	    {
		"add": [
		    "combat knife",
		    "astartes shotgun",
		    ["sniper rifle","camo cloak"]
		],
		"sub": ["boltgun"],
	    }
	]],
	["Scout Gunner",		6,3,3,4,4,1,1,7,4,2,11,[
	    "boltgun","bolt pistol","frag grenades","krak grenades"
	],[
	    {
		"add": [
		    "heavy bolter",
		    "missile launcher",
		    ["missile launcher","camo cloak"],
		    ["sniper rifle","camo cloak"]
		],
		"sub": ["boltgun"],
	    }
	]],
	["Scout Sergeant",		6,3,3,4,4,1,2,8,4,1,11,[
	    "boltgun","bolt pistol","frag grenades","krak grenades"
	],[
	    {
		"add": [
		    "astartes shotgun",
		    "chainsword",
		    ["sniper rifle","camo cloak"]
		],
		"sub": ["boltgun"],
	    }
	]],

	["Tactical Marine",		6,3,3,4,4,1,1,7,3,null,12,[
	    "boltgun","bolt pistol","frag grenades","krak grenades"
	],{}],
	["Tactical Marine Gunner",	6,3,3,4,4,1,1,7,3,2,13,[
	    "boltgun","bolt pistol","frag grenades","krak grenades"
	],[
	    {
		"add": [
		    "flamer",
		    "meltagun",
		    "plasma gun",
		    "grav-gun",
		    "missile launcher",
		    "heavy bolter"
		],
		"sub": ["boltgun"],
	    }
	]],
	["Tactical Sergeant",		6,3,3,4,4,1,2,8,3,1,13,[
	    "boltgun","bolt pistol","frag grenades","krak grenades"
	],[
	    {
		"add": [
		    "combi-flamer",
		    "combi-grav",
		    "combi-melta",
		    "combi-plasma"
		],
		"sub": ["boltgun","bolt pistol"]
	    },
	    {
		"add": {
		    "1": [
			"boltgun",
			"bolt pistol",
			"plasma pistol",
			"grav-pistol"
		    ],
		    "2": [
			"chainsword",
			"power fist",
			"power sword",
			"auspex"
		    ],
		},
		"sub": ["boltgun","bolt pistol"]
	    }
	]],
	
	["Reiver",			6,3,3,4,4,2,2,7,3,null,16,[
	    "bolt carbine","heavy bolt pistol","frag grenades","krak grenades","shock grenades"
	],[
	    {
		"add": [
		    "combat knife",
		],
		"sub": ["bolt carbine"]
	    },
	    {
		"add": [
		    "grav-chute",
		],
		"sub": []
	    },
	    {
		"add": [
		    "grapnel launcher",
		],
		"sub": []
	    },
	]],
	["Reiver Sergeant",		6,3,3,4,4,2,3,8,3,1,17,[
	    "bolt carbine","heavy bolt pistol","frag grenades","krak grenades","shock grenades"
	],[
	    {
		"add": [
		    "combat knife",
		],
		"sub": ["bolt carbine"]
	    },
	    {
		"add": [
		    "combat knife",
		],
		"sub": ["heavy bolt pistol"]
	    },
	    {
		"add": [
		    "grav-chute",
		],
		"sub": []
	    },
	    {
		"add": [
		    "grapnel launcher",
		],
		"sub": []
	    },
	]],

	["Intercessor",			6,3,3,4,4,2,2,7,3,null,15,[
	    "bolt rifle","bolt pistol","frag grenades","krak grenades"
	],[
	    {
		"add": [
		    "auto bolt rifle",
		    "stalker bolt rifle",
		],
		"sub": ["bolt rifle"]
	    },
	]],
	["Intercessor Gunner",		6,3,3,4,4,2,2,7,3,2,16,[
	    "bolt rifle","bolt pistol","frag grenades","krak grenades"
	],[
	    {
		"add": [
		    "auto bolt rifle",
		    "stalker bolt rifle",
		],
		"sub": ["bolt rifle"]
	    },
	    {
		"add": [
		    "auxiliary grenade launcher",
		],
		"sub": []
	    },
	]],
	["Intercessor Sergeant",	6,3,3,4,4,2,3,8,3,1,16,[
	    "bolt rifle","bolt pistol","frag grenades","krak grenades"
	],[
	    {
		"add": [
		    "auto bolt rifle",
		    "stalker bolt rifle",
		    "hand flamer",
		    "chainsword",
		],
		"sub": ["bolt rifle"]
	    },
	    {
		"add": [
		    "power fist",
		    "power sword",
		    "chainsword",
		    "thunder hammer",
		],
		"sub": ["chainsword if equipped"]
	    },
	]],
    ],
};

units.list		= units.unit_stats.map(function(values) {
    return zip( units.stat_names.map(s => s.toLowerCase()), values );
});

log("Units", units);


// Weapons

const weapons = {
    "stat_names": ["Name","Range","Type","S","AP","D","Abilities","Point Cost"],
    "weapon_stats": [
	["Astartes shotgun",	12,"Assault 2",4,0,1,"If the target is within half range, add 1 to this weapon's Strength.",0],
	["Auto bolt rifle",	24,"Assault 2",4,0,1,null,0],
	["Bolt carbine",	24,"Assault 2",4,0,1,null,0],
	["Bolt pistol",		12,"Rapid Fire 1",4,0,1,null,0],
	["Bolt rifle",		30,"Rapid Fire 1",4,-1,1,null,0],
	["Boltgun",		24,"Rapid Fire 1",4,0,1,null,0],
	["Combi-flamer", "When attacking with this weapon, choose one or both of the profiles below. If you choose both, subtract 1 from all hit rolls made for this weapon.", [
	    ["Boltgun",		24,"Rapid Fire 1",4,0,1,null],
	    ["Flamer",		8,"Assault D6",4,0,1,"This weapon automatically hits its target."],
	],3],
	["Combi-grav", "When attacking with this weapon, choose one or both of the profiles below. If you choose both, subtract 1 from all hit rolls made for this weapon.", [
	    ["Boltgun",		24,"Rapid Fire 1",4,0,1,null],
	    ["Grav-gun",	18,"Rapid Fire 1",5,-3,1,"If the target has a Save characteristic of 3+ or better, this weapon has a Damage of D3."],
	],2],
	["Combi-melta", "When attacking with this weapon, choose one or both of the profiles below. If you choose both, subtract 1 from all hit rolls made for this weapon.", [
	    ["Boltgun",		24,"Rapid Fire 1",4,0,1,null],
	    ["Meltagun",	12,"Assault 1",8,-4,"D6","If the target is within half range of this weapon, roll two dice when inflicting damage with it and discard the lowest result."],
	],3],
	["Combi-plasma", "When attacking with this weapon, choose one or both of the profiles below. If you choose both, subtract 1 from all hit rolls made for this weapon.", [
	    ["Boltgun",		24,"Rapid Fire 1",4,0,1,null],
	    ["Plasma gun",	24,"Rapid Fire 1",7,-3,1," <u>See plasma gun</u> "],
	],4],
	["Flamer",		8,"Assault D6",4,0,1,"This weapon automatically hits its target.",3],
	["Frag grenade",	6,"Grenade D6",3,0,1,null,0],
	["Grav-gun",		18,"Rapid Fire 1",5,-3,1,"If the target has a Save characteristic of 3+ or better, this weapon has a Damage of D3.",2],
	["Grav-pistol",		12,"Pistol 1",5,-3,1,"If the target has a Save characteristic of 3+ or better, this weapon has a Damage of D3.",1],
	["Heavy bolt pistol",	12,"Pistol 1",4,-1,1,null,0],
	["Heavy bolter",	36,"Heavy 3",5,-1,1,null,3],
	["Krak grenade",	6,"Grenade 1",6,-1,"D3",null,0],
	["Meltagun",		12,"Assault 1",8,-4,"D6","If the target is within half range of this weapon, roll two dice when inflicting damage with it and discard the lowest result.",3],
	["Missile launcher", "When attacking with this weapon, choose one of the profiles below.", [
	    ["Frag missile",	48,"Heavy D6",4,0,1,null],
	    ["Krak missile",	48,"Heavy 1",8,-2,"D6",null],
	],5],
	["Plasma gun", "When attacking with this weapon, choose one of the profiles below.", [
	    ["Standard",	24,"Rapid Fire 1",7,-3,1,null],
	    ["Supercharge",	24,"Rapid Fire 1",8,-3,2,"On an unmodified hit roll of 1, the bearer is taken out of action after all of this weapon's shots have been resolved."],
	],3],
	["Plasma pistol", "When attacking with this weapon, choose one of the profiles below.", [
	    ["Standard",	12,"Pistol 1",7,-3,1,null],
	    ["Supercharge",	12,"Pistol 1",8,-3,2,"On an unmodified hit roll of 1, the bearer is taken out of action after all of this weapon's shots have been resolved."],
	],1],
	["Shock grenade",	6,"Grenade D3","*","*","*","This weapon does not inflict any damage. If an enemy <b>INFANTRY</b> model is hit by any shock grenades, it is stunned; until the end of the next battle round that model cannot fire Overwatch or be Readied, and your opponent must subtract 1 from hit rolls made for the model.",0],
	["Sniper rifle",	36,"Heavy 1",4,0,1,"A model firing a sniper rifle does not suffer the penalty to hit rolls for the target being at long range. If you roll a wound roll of 6+ for this weapon, it inflicts a mortal wound in addition to its normal damage.",1],
	["Stalker bolt rifle",	36,"Heavy 1",4,-2,1,null,0],
	
	// Annual 2019 ranged changes
	["Hand flamer",	6,"Pistol D3",3,0,1,"This weapon automatically hits its target.",0],
	
	["","","","","",""," ",""],
	
	["Power fist",		"Melee","Melee","x2",-3,"D3","When attacking with this weapon, you must subtract 1 from the hit roll.",4],
	["Power sword",		"Melee","Melee","User",-3,1,null,2],
	["Chainsword",		"Melee","Melee","User",0,1,"Each time the bearer fights, it can make 1 additional attack with this weapon.",0],
	["Combat knife",	"Melee","Melee","User",0,1,"Each time the bearer fights, it can make 1 additional attack with this weapon.",0],
	
	// Annual 2019 melee changes
	["Thunder hammer",	"Melee","Melee","x2",-3,3,"When attacking with this weapon, you must subtract 1 from the hit roll.",8],
	["Paired combat blades","Melee","Melee","User",0,1,"When resolving an attack made with this weapon, an unmodified hit roll of 6 scores 1 addtional hit.",0],
    ],
};

weapons.list			= weapons.weapon_stats.map(function(values) {
    let stat_keys		= weapons.stat_names.map(s => s.toLowerCase());
    
    if ( values.length === 4 )
	return {
	    "name": values[0],
	    "description": values[1],
	    "options": values[2].map( values => zip( stat_keys.slice(0,-1), values ) ),
	    "point cost": values[3],
	}
    else
	return zip( stat_keys, values );
});

log("Weapons", weapons);



var app = new Vue({
    el: '#app',
    data: {
	units,
	weapons,
    }
})
