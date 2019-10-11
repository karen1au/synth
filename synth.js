import AudioKeys from 'audiokeys';
import Tone from 'tone';
import { scale } from '@tonaljs/scale';
import { sample } from 'lodash';

let scaleType1 = 'D4 melodic minor'
let scaleType2 = 'D5 melodic minor'

let { notes: n1 } = scale(scaleType1)
let { notes: n2 } = scale(scaleType2)
let notes = [...n1, ...n2]
//create a synth and connect it to the master output (your speakers)
// var synth = new Tone.Synth().toMaster()
var synth = new Tone.PolySynth(6, Tone.Synth, {
  oscillator : {
		type : "sine"
	}
}).toMaster();

var loop = new Tone.Loop(function(time){
	//triggered every eighth note. 
  console.log(time);
  let note = sample(notes)

  synth.triggerAttackRelease(note, '8n', time)  
}, "8n").start(0);
// Tone.Transport.start();

//play a middle 'C' for the duration of an 8th note

let ctx = new AudioContext()

// create a keyboard
var keyboard = new AudioKeys();

let oscMap = {}

keyboard.down( function() {
  let note = sample(notes)
  synth.triggerAttackRelease(note, '8n')
  

  // console.log("down",note)
  // let osc = ctx.createOscillator()
  // osc.frequency.value = note.frequency
  // osc.connect(ctx.destination)
  // osc.start()

  // oscMap[note.frequency] = osc
});

keyboard.up( function(note) {
  // let osc = oscMap[note.frequency]
  // osc.stop()
  // console.log("up",note)
});