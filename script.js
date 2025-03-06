// Function to update countdown timer
function updateCountdown() {
    let now = new Date();
    let istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
    let istTime = new Date(now.getTime() + istOffset);
    
    let hours = istTime.getUTCHours();
    let minutes = istTime.getUTCMinutes();
    let seconds = istTime.getUTCSeconds();

    let nextDraw;
    if (hours < 12) {
        nextDraw = new Date(istTime);
        nextDraw.setUTCHours(12, 0, 0, 0);
    } else if (hours < 18) {
        nextDraw = new Date(istTime);
        nextDraw.setUTCHours(18, 0, 0, 0);
    } else {
        nextDraw = new Date(istTime);
        nextDraw.setUTCDate(istTime.getUTCDate() + 1);
        nextDraw.setUTCHours(12, 0, 0, 0);
    }

    let timeDiff = nextDraw - istTime;
    let hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
    let minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    let secondsLeft = Math.floor((timeDiff % (1000 * 60)) / 1000);

    document.getElementById("timer").innerText = `${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`;

    setTimeout(updateCountdown, 1000);
}

// Function to fetch the correct result based on time
function fetchResult() {
    let now = new Date();
    let istOffset = 5.5 * 60 * 60 * 1000;
    let istTime = new Date(now.getTime() + istOffset);
    
    let hours = istTime.getUTCHours();

    let resultFile = "";
    if (hours >= 12 && hours < 18) {
        resultFile = "12pm.txt";
    } else if (hours >= 18) {
        resultFile = "6pm.txt";
    }

    if (resultFile) {
        fetch(resultFile)
            .then(response => response.text())
            .then(result => {
                let numbers = result.trim().split("");
                if (numbers.length === 6) {
                    document.getElementById("digit1").innerText = numbers[0];
                    document.getElementById("digit2").innerText = numbers[1];
                    document.getElementById("digit3").innerText = numbers[2];
                    document.getElementById("digit4").innerText = numbers[3];
                    document.getElementById("digit5").innerText = numbers[4];
                    document.getElementById("digit6").innerText = numbers[5];
                    document.getElementById("result-text").innerText = "Latest Draw Result:";
                }
            })
            .catch(error => {
                console.error("Error fetching result:", error);
            });
    } else {
        document.getElementById("result-text").innerText = "Awaiting Results...";
    }

    setTimeout(fetchResult, 60000); // Check result every 60 seconds
}

// Start countdown and result check on page load
window.onload = function () {
    updateCountdown();
    fetchResult();
};
const pastResults = [
  { date: "01-03-2025", time: "12:00 PM", result: "125845" },
  { date: "01-03-2025", time: "6:00 PM", result: "554896" },
  { date: "02-03-2025", time: "12:00 PM", result: "859647" },
  { date: "02-03-2025", time: "6:00 PM", result: "965241" },
  { date: "03-03-2025", time: "12:00 PM", result: "857124" },
  { date: "03-03-2025", time: "6:00 PM", result: "623854" },
  { date: "04-03-2025", time: "12:00 PM", result: "159753" },
  { date: "04-03-2025", time: "6:00 PM", result: "258951" },
  { date: "05-03-2025", time: "12:00 PM", result: "789628" },
  { date: "05-03-2025", time: "6:00 PM", result: "712954" },
  { date: "06-03-2025", time: "12:00 PM", result: "912614" },
  { date: "06-03-2025", time: "6:00 PM", result: "Awaiting for the result" }
];
function loadPastResults() {
    const resultsBody = document.getElementById("results-body");
    resultsBody.innerHTML = ""; // Clear existing table rows

    pastResults.forEach((entry) => {
        let row = document.createElement("tr");
        row.innerHTML = `<td>${entry.date}</td><td>${entry.time}</td><td>${entry.result}</td>`;
        resultsBody.appendChild(row);
    });
}

// Load results when the page loads
window.onload = function () {
    updateCountdown();
    fetchResult();
    loadPastResults(); // Add this line
};

