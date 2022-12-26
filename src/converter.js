import {
	AnimationClip,
	BooleanKeyframeTrack,
	ColorKeyframeTrack,
	NumberKeyframeTrack,
	Vector3,
	VectorKeyframeTrack
} from 'three';

var fps = 60

function modifiedKey(key) {

  if (["eyeLookDownLeft", "eyeLookDownRight", "eyeLookInLeft", "eyeLookInRight", "eyeLookOutLeft", "eyeLookOutRight", "eyeLookUpLeft", "eyeLookUpRight"].includes(key)) {
    return key
  }

  if (key.endsWith("Right")) {
    return key.replace("Right", "_R");
  }
  if (key.endsWith("Left")) {
    return key.replace("Left", "_L");
  }
  return key;
}

function createAnimation (recordedData, morphTargetDictionary, bodyPart) {

  // console.log("----morphTargetDictionary", morphTargetDictionary)

  if (recordedData.length != 0) {
    let animation = []
    for (let i = 0; i < Object.keys(morphTargetDictionary).length; i++) {
      animation.push([])
    }
    let time = []
    let finishedFrames = 0
    recordedData.forEach((d, i) => {
        Object.entries(d.blendshapes).forEach(([key, value]) => {

          if (! (modifiedKey(key) in morphTargetDictionary)) {return};
          
          if (key == 'mouthShrugUpper') {
            value += 0.4;
          }

          animation[morphTargetDictionary[modifiedKey(key)]].push(value)
        });
        time.push(finishedFrames / fps)
        finishedFrames++

    })

    // console.log("-----animation", animation);

    let tracks = []

    let flag = false;
    //create morph animation
    Object.entries(recordedData[0].blendshapes).forEach(([key, value]) => {

      if (! (modifiedKey(key) in morphTargetDictionary)) {return};

      let i = morphTargetDictionary[modifiedKey(key)]
      
      // if (bodyPart === "HG_TeethLower") {

      //       if (flag === true)
      //         return;
            
      //       if(key === 'jawOpen') {
      //         let track2 = new NumberKeyframeTrack(`HG_TeethLower.morphTargetInfluences[${i}]`, time, animation[i])
      //         tracks.push(track2)
      //         flag = true
      //       }
      // } else {
        let track = new NumberKeyframeTrack(`${bodyPart}.morphTargetInfluences[${i}]`, time, animation[i])

        tracks.push(track)
  
      // }

      
      // if (key === "jawOpen") {
      //   let track2 = new NumberKeyframeTrack(`HG_TeethLower.morphTargetInfluences[${i}]`, time, animation[i])
      //   tracks.push(track2)
      //   console.log("----jawOpen Track", track2);
      // }
    });

    const clip = new AnimationClip('animation', -1, tracks);
    return clip
  }
  return null
}

export default createAnimation;