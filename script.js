function newPage(name, num) {
  window.location.href = "quiz.html";
  sessionStorage.setItem('quiz_num', num);
  sessionStorage.setItem('quiz_name', name);
}

function createRadioElement(name, value, checked, id) {
	  if (checked) {
      var radioHtml = '<label class="container"><div id="' + id + '">' + value + '</div><input type="radio" checked="checked" name="' + name + '"><span class="checkmark"></span></label>';
    } else {
        var radioHtml = '<label class="container"><div id="' + id + '">' + value + '</div><input type="radio" name="' + name + '"><span class="checkmark"></span></label>';
    }

    var radioFragment = document.createElement('div');
    radioFragment.innerHTML = radioHtml;

    return radioFragment;
}
function createCheckboxElement(name, value, checked, id) {
	  if (checked) {
      var radioHtml = '<label class="checkcontainer"><div id="' + id + '">' + value + '</div><input type="checkbox" checked="checked" name="' + name + '"><span class="checkcheckmark"></span></label>';
    } else {
        var radioHtml = '<label class="checkcontainer"><div id="' + id + '">' + value + '</div><input type="checkbox" name="' + name + '"><span class="checkcheckmark"></span></label>';
    }

    var radioFragment = document.createElement('div');
    radioFragment.innerHTML = radioHtml;

    return radioFragment;
}

function createImageElement(filename, alttext) {
    var radioHtml = '<center><img src="' + filename + '" class="image" alt="' + alttext + '"></center><br>';
    var radioFragment = document.createElement('div');
    radioFragment.innerHTML = radioHtml;
    return radioFragment;
}

function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

function selSampleImg() {
	var diagrams = ["galaxies-diagram.png", "Constellations.png", "Eclipsing Binaries.png", "Heliocentric Parallax.png", "Optical Telescope.png", "Refraction by Lenses.png", "Star Pointers - Orion.png", "Star Pointers - The Great Square.png", "Star Pointers - The Plough.png"];
	diagrams = shuffle(diagrams);
	var imgName = diagrams[0];
	
	var img = document.getElementById("img1");
	img.setAttribute('src', imgName);
	
}

function getQuizName() {
  return sessionStorage.getItem('quiz_name');
}
function getQuizNum() {
  return sessionStorage.getItem('quiz_num');
}
function getQuizFileName(num) {
  var array = [ "naked-eye-quiz.txt", "telescopic-quiz.txt", "earth-quiz.txt", "moon-quiz.txt", "sun-quiz.txt", "solar-system-1.txt", "solar-system-2.txt", "comets-quiz.txt", "exoplanet-quiz.txt", "night-sky-quiz.txt", "stars-quiz.txt", "star-evolution.txt", "galaxy-quiz.txt", "cosmology-quiz.txt", "telescope-quiz.txt", "exploration-quiz.txt"];
  return array[num-1];
}

function returnString() {
  return "Hi!"; 
}

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    var allText = "";
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                allText = rawFile.responseText;
              
            }
        }
    }
    rawFile.send(null);
    return allText;
}

function makeQuiz(file)  {
	
  if (file.indexOf(".txt") > -1) {
	  var text = readTextFile(file);
  } else {
	  var text = file;
  }
  
  var lines = text.split("\n");
  
  lines.pop();
  lines = shuffle(lines);
	
  sessionStorage.setItem('quiz_data', lines.join("$"));
	

  
  var d = document.createElement("div");
  var f = document.createElement("form");
  f.setAttribute('id', "quiz");
  
//    f.setAttribute('method',"post");
//  f.setAttribute('action',"action.php");


  
lines.forEach(function(item, index) {
  var curr = item.split("+");
  var text = (index+1).toString(10) + ". " + curr[0];
  var type = curr[1];
  var ans =  curr[curr.length - 1];
    
  var q = document.createElement("div");
  q.className = "div";
  q.setAttribute('id', index.toString(10))
  var para = document.createElement("P");                       // Create a <p> node
  var t = document.createTextNode(text);      // Create a text node
  para.appendChild(t);
  q.appendChild(para);
  
  if (type == " wn ") {
    var inp = document.createElement("input"); //input element, text
    inp.setAttribute('type',"number");
    q.appendChild(inp);
  		var ansdiv = document.createElement("div");
		ansdiv.setAttribute('class', "hide");
	  	var ansclass = "ans" + index.toString(10);
		ansdiv.setAttribute('id', ansclass);
	  	var anstext = '<p class="correction">' + ans.trim() + "</p>"
		ansdiv.innerHTML = anstext;
		q.appendChild(ansdiv);
}
  else if (type == " ww ") {
    var inp = document.createElement("input"); //input element, text
    inp.setAttribute('type',"text");
    q.appendChild(inp);
  		var ansdiv = document.createElement("div");
		ansdiv.setAttribute('class', "hide");
	  	var ansclass = "ans" + index.toString(10);
		ansdiv.setAttribute('id', ansclass);
	  	var anstext = '<p class="correction">' + ans.trim() + "</p>"
		ansdiv.innerHTML = anstext;
		q.appendChild(ansdiv);
}
  else if (type == " rb ") {
    var opt = curr[2].split(";");
    opt.forEach(function(option, ind) {
      var inp = createRadioElement(index.toString(), option, 0, index.toString(10) + "rb" + (ind+1).toString(10));
      q.appendChild(inp);  
    });
    
    }
  else if (type == " cb ") {
    var opt = curr[2].split(";");
    opt.forEach(function(option, ind) {
      var inp = createCheckboxElement(index.toString(), option, 0, index.toString(10) + "cb" + (ind+1).toString(10));
      q.appendChild(inp);  
    });
    
    }
else if (type == " img ") {
	var ImgSrc = curr[2].split(";")[0];
	var ImgAlt = curr[2].split(";")[1];
	var img = createImageElement(ImgSrc, ImgAlt);
	q.append(img);
	type = curr[3]
	  if (type == " wn ") {
	    var inp = document.createElement("input"); //input element, text
	    inp.setAttribute('type',"number");
	    q.appendChild(inp);
  		var ansdiv = document.createElement("div");
		ansdiv.setAttribute('class', "hide");
	  	var ansclass = "ans" + index.toString(10);
		ansdiv.setAttribute('id', ansclass);
	  	var anstext = '<p class="correction">' + ans.trim() + "</p>"
		ansdiv.innerHTML = anstext;
		q.appendChild(ansdiv);
		  
	  }
	  else if (type == " ww ") {
	    var inp = document.createElement("input"); //input element, text
	    inp.setAttribute('type',"text");
	    q.appendChild(inp);
  		var ansdiv = document.createElement("div");
		ansdiv.setAttribute('class', "hide");
	  	var ansclass = "ans" + index.toString(10);
		ansdiv.setAttribute('id', ansclass);
	  	var anstext = '<p class="correction">' + ans.trim() + "</p>"
		ansdiv.innerHTML = anstext;
		q.appendChild(ansdiv);
	  }
	  else if (type == " rb ") {
	    var opt = curr[4].split(";");
	    opt.forEach(function(option, ind) {
	      var inp = createRadioElement(index.toString(), option, 0, index.toString(10) + "rb" + (ind+1).toString(10));
	      q.appendChild(inp);  
	    });

	    }
	  else if (type == " cb ") {
	    var opt = curr[4].split(";");
	    opt.forEach(function(option, ind) {
	      var inp = createCheckboxElement(index.toString(), option, 0, index.toString(10) + "cb" + (ind+1).toString(10));
	      q.appendChild(inp);  
	    });

	    }
	}
  
  f.appendChild(q);
//  d.appendChild(q);
});
  
  
  //and some more input elements here
//and dont forget to add a submit button
d.appendChild(f);
document.getElementsByTagName('body')[0].appendChild(d);  
document.getElementsByTagName('body')[0].appendChild(f);  
 }
