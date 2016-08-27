var texts = [
	"<h1>Multiples of 3 and 5</h1>\
	<p>If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. \
		The sum of these multiples is 23.</p>\
	<p>Find the sum of all the multiples of 3 or 5 below 1000.</p>",

	"<h1>Even Fibonacci numbers</h1>\
	<p>Each new term in the Fibonacci sequence is generated by adding the previous two terms. \
		By starting with 1 and 2, the first 10 terms will be:</p>\
	<p>1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...</p>\
	<p>By considering the terms in the Fibonacci sequence whose values do not exceed four million, \
		find the sum of the even-valued terms.</p>",

	"<h1>Largest prime factor</h1>\
	<p>The prime factors of 13195 are 5, 7, 13 and 29.</p>\
	<p>What is the largest prime factor of the number 600851475143 ?</p>"]

var jsCode = ["function multiples(numbers) {\r\n\
	numbers[3] = numbers[1] * numbers[2];\r\n\
	var sum = 0;\r\n\
	for (var i = 1; i < 4; i++) {\r\n\
		var max = numbers[0] / numbers[i];\r\n\
		max = (max % numbers[i] === 0) ? max - 1 : Math.floor(max);\r\n\
		var sum1 = max * (max + 1) / 2 * numbers[i];\r\n\
		sum += (i < 3) ? sum1 : -sum1;\r\n\
	}\r\n\
	return sum;\r\n\
}",

"function evenFibonacciSum(limit) {\r\n\
	var n1 = 1, n2 = 2, sum = 0;\r\n\
	while (n2 <= limit) {\r\n\
		if (n2 % 2 === 0) {\r\n\
			sum += n2;\r\n\
		}\r\n\
		n2 += n1;\r\n\
		n1 = n2 - n1;\r\n\
	}\r\n\
	return sum;\r\n\
}",

"function largestPrime(number) {\r\n\
	while (number % 2 === 0) {\r\n\
		number /= 2;\r\n\
	}\r\n\
	var max = Math.sqrt(number);\r\n\
	for (var i = 3; i <= max; i += 2) {\r\n\
		while (number % i === 0) {\r\n\
			number /= i;\r\n\
			max = Math.sqrt(number);\r\n\
		}\r\n\
	}\r\n\
	return number;\r\n\
}"]

var rbCode = ["def multiples numbers\r\n\
    numbers[3] = numbers[1] * numbers [2]\r\n\
    sum = 0\r\n\
    (1..3).each do |i|\r\n\
        max = (numbers[0] / numbers[i]).floor\r\n\
        max = max - 1 if numbers[0] % numbers[i] == 0\r\n\
        sum1 = max * (max + 1) / 2 * numbers[i]\r\n\
        sum += (i < 3) ? sum1 : -sum1\r\n\
    end\r\n\
    sum\r\n\
end",

"def evenFibonacciSum limit\r\n\
    n1 = 1\r\n\
    n2 = 2\r\n\
    sum = 0\r\n\
    while n2 <= limit do\r\n\
        if (n2 % 2 === 0)\r\n\
            sum += n2\r\n\
        end\r\n\
        n2 += n1\r\n\
        n1 = n2 - n1\r\n\
    end\r\n\
    sum\r\n\
end",

"def largestPrime number\r\n\
    number /= 2 while number % 2 == 0\r\n\
    max = number ** 0.5\r\n\
    i = 3\r\n\
    while i <= max do\r\n\
        while number % i === 0 do\r\n\
            number /= i\r\n\
            max = number ** 0.5\r\n\
        end\r\n\
        i += 2\r\n\
    end\r\n\
    number\r\n\
end"]

var jsCalls = ["multiples([1000, 3, 5]);", "evenFibonacciSum(4000000);", "largestPrime(600851475143);"]
var rbCalls = ["multiples [1000, 3, 5]", "evenFibonacciSum 4000000", "largestPrime 600851475143"]

var jsTimes = [0, 0, 0]
var rbTimes = [0, 0, 0]

var jsResults = [0, 0, 0]
var rbResults = [0, 0, 0]

var activeTab = 3;
var jsMode = true;

$(document).ready(function() {
	body = $('body');
	problemdiv = $('#problem');
	text = $('#text');
	call = $('#func');
	time = $('#time');
	result = $('#res');
	navButtons = $('.navb');
	navList = $('li');

	navButtons.hover(function() {
		$(this).toggleClass('hover');
	});
		
	navButtons.on('click', function(event) {
		event.preventDefault();
		navButtons.removeClass('hover');
		navButtons.removeClass('highlight');
		$(this).addClass('highlight');
		load(navList.index($(this).parent()) - 2);
	});

	$('#calc').on('click', function(event) {
		event.preventDefault();
		$('#scr').remove();
		if (jsMode) {
			$('<script id="scr"></script>').text("function calculate() { return " + call.val() + " } " + editor.getValue()).appendTo('head');
			var start = new Date();
			result.text(calculate());
			time.text(new Date() - start + ' ms');
		} else {
			var start = new Date();
			$('<script id="scr"></script>').text(Opal.compile(editor.getValue()) + ' tr = ' + Opal.compile(call.val())).appendTo('head');
			time.text(new Date() - start + ' ms');
			result.text(tr);
		}
	});
});

function load(problem) {
	save();
	text.html(texts[problem]);
	getCode(problem);
	activeTab = problem;
}

function save() {
	if (activeTab < 3) {
	setCode();
	} else {
		$('#logo').hide();
		$('#problem').show();
	}
}

function getCode(number) {
	if (jsMode) {
		editor.setValue(jsCode[number]);
		call.val(jsCalls[number]);
		time.text(jsTimes[number]);
		result.text(jsResults[number]);
	} else {
		editor.setValue(rbCode[number]);
		call.val(rbCalls[number]);
		time.text(rbTimes[number]);
		result.text(rbResults[number]);
	}
	editor.gotoLine(editor.session.getLength());
}

function setCode() {
	if (jsMode) {
		jsCode[activeTab] = editor.getValue();
		jsCalls[activeTab] = call.val();
		jsTimes[activeTab] = time.text();
		jsResults[activeTab] = result.text();
	} else {
		rbCode[activeTab] = editor.getValue();
		rbCalls[activeTab] = call.val();
		rbTimes[activeTab] = time.text();
		rbResults[activeTab] = result.text();
	}
}

var notOpalLoad = true;
function switchMode() {
	setCode();
	jsMode = !jsMode;
	getCode(activeTab);
	if (jsMode) {
		editor.getSession().setMode("ace/mode/javascript");
	} else {
		editor.getSession().setMode("ace/mode/ruby");
		if (notOpalLoad) {
			Opal.load('opal-parser');
			notOpalLoad = false;
		}
	}
}