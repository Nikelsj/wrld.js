var space = require("../../public/space");

function vec4ToRgba32(v) {
    var rgba = ((v.x & 0xFF) << 24) + ((v.y & 0xFF) << 16) + ((v.z & 0xFF) << 8) + (v.w & 0xFF);
    return rgba;
}

function hexToRgba32(hex) {
    // https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb

    hex = hex.replace(/^#/, "");
    var a = 0xff;
    if (hex.length === 8) {
        a = parseInt(hex.slice(6, 8), 16) & 0xff;
    }
    else if (hex.length === 4) {
        a = parseInt(hex.slice(3, 4).repeat(2), 16) & 0xff;
    }

    var rgb = 0xffffff;
    if (hex.length === 6 || hex.length === 8) {
        rgb = parseInt(hex.substring(0, 6), 16) & 0xffffff;
    }
    else if (hex.length === 3 || hex.length === 4) {
        rgb = parseInt((hex[0].repeat(2) + hex[1].repeat(2) + hex[2].repeat(2)), 16) & 0xffffff;
    }

    return (rgb << 8) + a;
}

function colorArrayToVector4(color) {
    var r = 0.0;
    var g = 0.0;
    var b = 0.0;
    var a = 255.0;
    if (Array.isArray(color) && color.length >= 3) {
        r = color[0];
        g = color[1];
        b = color[2];
        if (color.length > 3) {
            a = color[3];
        }
    }
    else {
        throw new Error("Unable to parse color from array: " + String(color));
    }

    if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(a)) {
        throw new Error("Unable to parse color - value out of range: " + String(color));
    }
    return new space.Vector4(r, g, b, a);
}

function colorObjectToVector4(color) {
    var r = undefined;
    var g = undefined;
    var b = undefined;
    var a = 255.0;
    if (typeof color === "object") {
        if (color.hasOwnProperty("r")) {
            r = color.r;
        }
        else if (color.hasOwnProperty("x")) {
            r = color.x;
        }

        if (color.hasOwnProperty("g")) {
            g = color.g;
        }
        else if (color.hasOwnProperty("y")) {
            g = color.y;
        }

        if (color.hasOwnProperty("b")) {
            b = color.b;
        }
        else if (color.hasOwnProperty("z")) {
            b = color.z;
        }

        if (color.hasOwnProperty("a")) {
            a = color.a;
        }
        else if (color.hasOwnProperty("w")) {
            a = color.w;
        }
    }
    else {
        throw new Error("Unable to parse color: " + String(color));
    }

    if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(a)) {
        throw new Error("Unable to parse color - value out of range: " + String(color));
    }
    return new space.Vector4(r, g, b, a);
}

function colorToRgba32(color) {
    if (typeof(color) === "string") {
        return hexToRgba32(color);
    }
    else if (Array.isArray(color)) {
        return vec4ToRgba32(colorArrayToVector4(color));
    }
    else if (typeof color === "object") {
        return vec4ToRgba32(colorObjectToVector4(color));
    }

    throw new Error("Unable to parse color: " + String(color));
}

module.exports = {
    colorToRgba32: colorToRgba32
};
