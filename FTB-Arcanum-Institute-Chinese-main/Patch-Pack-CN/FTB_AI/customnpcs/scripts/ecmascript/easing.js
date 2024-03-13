


var Ease = {
    "none": "none",
    "easeInQuadratic": easeInQuadratic,
    "easeOutQuadratic": easeOutQuadratic,
    "easeInOutQuadratic": easeInOutQuadratic,
    "easeInQuartic": easeInQuartic,
    "easeOutQuartic": easeOutQuartic,
    "easeInOutQuartic": easeInOutQuartic,
    "easeInExponential": easeInExponential,
    "easeOutExponential": easeOutExponential,
    "easeInOutExponential": easeInOutExponential,
    "easeInCircular": easeInCircular,
    "easeOutCircular": easeOutCircular,
    "easeInOutCircular": easeInOutCircular,
    "easeInElastic": easeInElastic,
    "easeOutElastic": easeOutElastic,
    "easeInOutElastic": easeInOutElastic,
    "easeInBounce": easeInBounce,
    "easeOutBounce": easeOutBounce,
    "easeInOutBounce": easeInOutBounce,
    "easeInSine": easeInSine,
    "easeOutSine": easeOutSine,
    "easeInOutSine": easeInOutSine,
    "easeInCubic": easeInCubic,
    "easeOutCubic": easeOutCubic,
    "easeInOutCubic": easeInOutCubic,
    "easeInQuint": easeInQuintic,
    "easeOutQuint": easeOutQuintic,
    "easeInOutQuint": easeInOutQuintic,
    "easeInBack": easeInBack,
    "easeOutBack": easeOutBack,
    "easeInOutBack": easeInOutBack
}
//Quadratic Easing:
var easeInQuadratic = function(t) {
    return t * t;
}

var easeOutQuadratic = function(t) {
    return 1 - (1 - t) * (1 - t);
}

var easeInOutQuadratic = function(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}


//Quartic Easing:
var easeInQuartic = function(t) {
    return t * t * t * t;
}

var easeOutQuartic = function(t) {
    return 1 - Math.pow(1 - t, 4);
}

var easeInOutQuartic = function(t) {
    return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
}


//Exponential Easing:
var easeInExponential = function(t) {
    return t === 0 ? 0 : Math.pow(2, 10 * (t - 1));
}

var easeOutExponential = function(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

var easeInOutExponential = function(t) {
    return t === 0
        ? 0
        : t === 1
            ? 1
            : t < 0.5
                ? Math.pow(2, 20 * t - 10) / 2
                : (2 - Math.pow(2, -20 * t + 10)) / 2;
}


//Elastic Easing:
var easeInElastic = function(t) {
    return t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * (2 * Math.PI) / 3);
}

var easeOutElastic = function(t) {
    return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * (2 * Math.PI) / 3) + 1;
}

var easeInOutElastic = function(t) {
    return t === 0
        ? 0
        : t === 1
            ? 1
            : t < 0.5
                ? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * (2 * Math.PI) / 4.5)) / 2
                : (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * (2 * Math.PI) / 4.5)) / 2 + 1;
}


//Bounce Easing
var easeInBounce = function(t) {
    return 1 - easeOutBounce(1 - t);
}
var easeOutBounce = function(t) {
    var bounce = 7.5625
    if (t < 1 / 2.75) {
        return bounce * t * t;
    } else if (t < 2 / 2.75) {
        return bounce * (t -= 1.5 / 2.75) * t + 0.75;
    } else if (t < 2.5 / 2.75) {
        return bounce * (t -= 2.25 / 2.75) * t + 0.9375;
    } else {
        return bounce * (t -= 2.625 / 2.75) * t + 0.984375;
    }
}
var easeInOutBounce = function(t) {
    return t < 0.5 ? (1 - easeOutBounce(1 - 2 * t)) / 2 : (1 + easeOutBounce(2 * t - 1)) / 2;
}


//Sine Easing:
var easeInSine = function(t) {
    return 1 - Math.cos((t * Math.PI) / 2);
}

var easeOutSine = function(t) {
    return Math.sin((t * Math.PI) / 2);
}

var easeInOutSine = function(t) {
    return -0.5 * (Math.cos(Math.PI * t) - 1);
}


//Cubic Easing:
var easeInCubic = function(t) {
    return t * t * t;
}

var easeOutCubic = function(t) {
    return 1 - Math.pow(1 - t, 3);
}

var easeInOutCubic = function(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}


//Quintic Easing:
var easeInQuintic = function(t) {
    return t * t * t * t * t;
}

var easeOutQuintic = function(t) {
    return 1 - Math.pow(1 - t, 5);
}

var easeInOutQuintic = function(t) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
}


//Circular Easing:
var easeInCircular = function(t) {
    return 1 - Math.sqrt(1 - t * t);
}

var easeOutCircular = function(t) {
    return Math.sqrt(1 - Math.pow(t - 1, 2));
}

var easeInOutCircular = function(t) {
    return t < 0.5 ? (1 - Math.sqrt(1 - 4 * t * t)) / 2 : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2;
}

// Back Easing:
var easeInBack = function(t) {
    var s = 1.70158;
    return t * t * ((s + 1) * t - s);
}
var easeOutBack = function(t) {
    var s = 1.70158;
    return 1 - (--t) * (t) * ((s + 1) * t + s);
}

var easeInOutBack = function(t) {
    var s = 1.70158 * 1.525;
    return t < 0.5
        ? 0.5 * (t * t * ((s + 1) * t - s * 1.525))
        : 0.5 * ((t -= 2) * t * ((s + 1) * t + s * 1.525) + 2);
}

var saved_poses_array = {
    default: {
        "head": {
         "id": 0,
         "x": 180,
         "y": 180,
         "z": 180,
         "ease": "none",
         "animationDelay": 30,
         "animationResolution": 15
        },
        "body": {
         "id": 3,
         "x": 180,
         "y": 180,
         "z": 180,
         "ease": "none",
         "animationDelay": 30,
         "animationResolution": 15
        },
        "arm": {
         "left": {
          "id": 1,
          "x": 180,
          "y": 180,
          "z": 180,
          "ease": "none",
          "animationDelay": 30,
          "animationResolution": 15
         },
         "right": {
          "id": 2,
          "x": 180,
          "y": 180,
          "z": 180,
          "ease": "none",
          "animationDelay": 30,
          "animationResolution": 15
         }
        },
        "leg": {
         "left": {
          "id": 4,
          "x": 180,
          "y": 180,
          "z": 180,
          "ease": "none",
          "animationDelay": 30,
          "animationResolution": 15
         },
         "right": {
          "id": 5,
          "x": 180,
          "y": 180,
          "z": 180,
          "ease": "none",
          "animationDelay": 30,
          "animationResolution": 15
         }
        }
    },
    wandInAir: {
        "head": {
         "id": 0,
         "x": 129,
         "y": 180,
         "z": 180,
         "ease": "none",
         "animationDelay": 2,
         "animationResolution": 200
        },
        "body": {
         "id": 3,
         "x": 180,
         "y": 180,
         "z": 180,
         "ease": "none",
         "animationDelay": 2,
         "animationResolution": 200
        },
        "arm": {
         "left": {
          "id": 1,
          "x": 180,
          "y": 180,
          "z": 163,
          "ease": "none",
          "animationDelay": 2,
          "animationResolution": 200
         },
         "right": {
          "id": 2,
          "x": 171,
          "y": 268,
          "z": 296,
          "ease": "none",
          "animationDelay": 2,
          "animationResolution": 200
         }
        },
        "leg": {
         "left": {
          "id": 4,
          "x": 180,
          "y": 180,
          "z": 180,
          "ease": "none",
          "animationDelay": 2,
          "animationResolution": 200
         },
         "right": {
          "id": 5,
          "x": 180,
          "y": 180,
          "z": 180,
          "ease": "none",
          "animationDelay": 2,
          "animationResolution": 200
         }
        }
    },
    boxingPose: {
        "head": {
         "id": 0,
         "x": 180,
         "y": 180,
         "z": 180,
         "ease": "none",
         "animationDelay": 2,
         "animationResolution": 200
        },
        "body": {
         "id": 3,
         "x": 180,
         "y": 180,
         "z": 180,
         "ease": "none",
         "animationDelay": 2,
         "animationResolution": 200
        },
        "arm": {
         "left": {
          "id": 1,
          "x": 100,
          "y": 220,
          "z": 120,
          "ease": "none",
          "animationDelay": 2,
          "animationResolution": 200
         },
         "right": {
          "id": 2,
          "x": 100,
          "y": 140,
          "z": 240,
          "ease": "none",
          "animationDelay": 2,
          "animationResolution": 200
         }
        },
        "leg": {
         "left": {
          "id": 4,
          "x": 180,
          "y": 180,
          "z": 180,
          "ease": "none",
          "animationDelay": 2,
          "animationResolution": 200
         },
         "right": {
          "id": 5,
          "x": 180,
          "y": 180,
          "z": 180,
          "ease": "none",
          "animationDelay": 2,
          "animationResolution": 200
         }
        }
    },
    hands_down: {
        "head": {
         "id": 0,
         "x": 220,
         "y": 163,
         "z": 178,
         "ease": "none",
         "animationDelay": 30,
         "animationResolution": 15
        },
        "body": {
         "id": 3,
         "x": 180,
         "y": 180,
         "z": 180,
         "ease": "none",
         "animationDelay": 30,
         "animationResolution": 15
        },
        "arm": {
         "left": {
          "id": 1,
          "x": 207,
          "y": 223,
          "z": 159,
          "ease": Ease.easeInOutExponential,
          "animationDelay": 30,
          "animationResolution": 15
         },
         "right": {
          "id": 2,
          "x": 168,
          "y": 111,
          "z": 207,
          "ease": Ease.easeInOutExponential,
          "animationDelay": 30,
          "animationResolution": 15
         }
        },
        "leg": {
         "left": {
          "id": 4,
          "x": 180,
          "y": 180,
          "z": 180,
          "ease": "none",
          "animationDelay": 30,
          "animationResolution": 15
         },
         "right": {
          "id": 5,
          "x": 180,
          "y": 180,
          "z": 180,
          "ease": "none",
          "animationDelay": 30,
          "animationResolution": 15
         }
        }
    },
    hands_up: {
        "head": {
         "id": 0,
         "x": 141,
         "y": 204,
         "z": 146,
         "ease": Ease.none,
         "animationDelay": 30,
         "animationResolution": 15
        },
        "body": {
         "id": 3,
         "x": 180,
         "y": 180,
         "z": 180,
         "ease": "none",
         "animationDelay": 30,
         "animationResolution": 15
        },
        "arm": {
         "left": {
          "id": 1,
          "x": 42,
          "y": 204,
          "z": 146,
          "ease": Ease.easeInOutExponential,
          "animationDelay": 30,
          "animationResolution": 15
         },
         "right": {
          "id": 2,
          "x": 171,
          "y": 268,
          "z": 296,
          "ease": Ease.easeInOutExponential,
          "animationDelay": 30,
          "animationResolution": 15
         }
        },
        "leg": {
         "left": {
          "id": 4,
          "x": 180,
          "y": 180,
          "z": 180,
          "ease": "none",
          "animationDelay": 30,
          "animationResolution": 15
         },
         "right": {
          "id": 5,
          "x": 180,
          "y": 180,
          "z": 180,
          "ease": "none",
          "animationDelay": 30,
          "animationResolution": 15
         }
        }
    },
    hands_both_up: {
        "head": {
         "id": 0,
         "x": 180,
         "y": 180,
         "z": 180,
         "ease": "none",
         "animationDelay": 2,
         "animationResolution": 200
        },
        "body": {
         "id": 3,
         "x": 180,
         "y": 180,
         "z": 180,
         "ease": "none",
         "animationDelay": 2,
         "animationResolution": 200
        },
        "arm": {
         "left": {
          "id": 1,
          "x": 164,
          "y": 78,
          "z": 79,
          "ease": Ease.easeInOutExponential,
          "animationDelay": 2,
          "animationResolution": 250
         },
         "right": {
          "id": 2,
          "x": 180,
          "y": 292,
          "z": 294,
          "ease": Ease.easeInOutExponential,
          "animationDelay": 2,
          "animationResolution": 300
         }
        },
        "leg": {
         "left": {
          "id": 4,
          "x": 180,
          "y": 180,
          "z": 180,
          "ease": "none",
          "animationDelay": 2,
          "animationResolution": 200
         },
         "right": {
          "id": 5,
          "x": 180,
          "y": 180,
          "z": 180,
          "ease": "none",
          "animationDelay": 2,
          "animationResolution": 200
         }
        }
    },
    hands_both_down: {
    "head": {
        "id": 0,
        "x": 210,
        "y": 180,
        "z": 180,
        "ease": "none",
        "animationDelay": 2,
        "animationResolution": 200
    },
    "body": {
        "id": 3,
        "x": 180,
        "y": 180,
        "z": 180,
        "ease": "none",
        "animationDelay": 2,
        "animationResolution": 200
    },
    "arm": {
        "left": {
        "id": 1,
        "x": 145,
        "y": 220,
        "z": 120,
        "ease": Ease.easeInOutExponential,
        "animationDelay": 2,
        "animationResolution": 250
        },
        "right": {
        "id": 2,
        "x": 128,
        "y": 143,
        "z": 255,
        "ease": Ease.easeInOutExponential,
        "animationDelay": 2,
        "animationResolution": 250
        }
    },
    "leg": {
        "left": {
        "id": 4,
        "x": 180,
        "y": 180,
        "z": 180,
        "ease": "none",
        "animationDelay": 2,
        "animationResolution": 200
        },
        "right": {
        "id": 5,
        "x": 180,
        "y": 180,
        "z": 180,
        "ease": "none",
        "animationDelay": 2,
        "animationResolution": 200
        }
    }
    }
}

