let chart; // Global chart instance

const chartConfigs = {
  eviction: {
    type: 'bar',
    data: {
      labels: ['Hyde Park', 'Roxbury', 'Jamica Plain', 'South Boston'],
      datasets: [{
        label: 'Boston Eviction Filings per 10,000 Renter Units, Jan. 2020 to Mar. 2021',
        data: [233.2, 222.9, 84, 28.6],
        backgroundColor: '#f25c54'
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    },
    description: `Evictions are not evenly distributed across Boston. Neighborhoods like Hyde Park and Roxbury face disproportionately high eviction filings, while wealthier areas like Back Bay (not even pictured in the chart because the eviction number was so low) remain largely untouched. This spatial inequality reflects deeper patterns of racial and economic marginalization. In areas with high eviction rates, residents often experience housing precarity, job loss, and educational instability, creating a feedback loop that is hard to escape. Eviction isn't just a legal process—it disrupts lives, displaces families, and compounds cycles of poverty. <br><br> <b>Source:</b> <a href="https://www.tbf.org/news-and-insights/reports/2021/jun/greater-boston-housing-report-card-2021/gbhrc2021-chapter-2" target="_blank">The Boston Foundation, Housing Report Card (2021)</a>`

  },
  redlining: {
    type: 'bar',
    data: {
      labels: ['Roxbury', 'Dorchester', 'Mattapan', 'Back Bay'],
      datasets: [{
        label: 'Percent Redlined (1930s)',
        data: [80, 70, 60, 5],
        backgroundColor: '#d72638'
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true, max: 100 }
      }
    },
    description: `In the 1930s, the Home Owners’ Loan Corporation (HOLC) created maps grading neighborhoods based on perceived investment risk. “Redlined” areas—marked in red—were deemed hazardous, often because they were home to Black and immigrant communities. Roxbury and Dorchester were among those severely impacted. Redlining made it nearly impossible for residents in these areas to access loans, mortgages, or insurance. This institutional disinvestment laid the groundwork for generational wealth gaps that persist today, reinforcing segregation and limiting upward mobility. <br><br> <b>Source:</b> <a href="https://dsl.richmond.edu/panorama/redlining/" target="_blank">Mapping Inequality, University of Richmond</a>`

  },
  demographics: {
    type: 'line',
    data: {
        labels: ['1980', '1990', '2000', '2010', '2020'],
        datasets: [
          {
            label: 'Black Population in Roxbury (%)',
            data: [67, 63, 65, 58, 50],
            borderColor: '#1f77b4',
            backgroundColor: 'rgba(31, 119, 180, 0.2)',
            fill: true
          },
          {
            label: 'White Population in Roxbury (%)',
            data: [12, 14, 10, 17, 24],
            borderColor: '#ff7f0e',
            backgroundColor: 'rgba(255, 127, 14, 0.2)',
            fill: true
          }
        ]        
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true, max: 100 }
      }
    },
    description: `Roxbury has historically been a hub for Boston’s Black community, but over the past four decades, it has undergone significant demographic transformation. The data shows a consistent decline in the Black population and a steady increase in the white population, particularly after 2000. This shift reflects more than just population change—it signals gentrification, rising rents, and displacement. As wealthier (often white) residents move in, long-time residents are priced out, altering the social fabric and cultural identity of the neighborhood. <br><br> 
    <b>Sources:</b> 
    <a href="https://www.bostonplans.org/documents/research-other/neighborhood-profile-2017/neighborhood-profile-roxbury" target="_blank">Boston Planning & Development Agency (2017)</a>,
    <a href="https://www.cityofboston.gov/parks/OpenSpace_07draft/RoxburyDemographicHousingTables.pdf" target="_blank">City of Boston Demographic Tables</a>`

  },
  gentrification: {
    type: 'bar',
    data: {
      labels: ['Roxbury', 'Dorchester', 'Jamaica Plain', 'South End'],
      datasets: [{
        label: 'Median Rent Increase (2010–2020, $)',
        data: [438, 450, 450, 500],
        backgroundColor: '#3498db',
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    },
    description: `From 2010 to 2020, median rents in Boston’s neighborhoods surged, with South End experiencing the steepest increase of $500. While Roxbury had a lower absolute increase than some other areas, its residents are more vulnerable to these shifts due to lower median household incomes.
  
  These rent hikes reflect broader gentrification pressures. Long-time residents, particularly in historically marginalized neighborhoods, face increasing housing insecurity as affordability drops. The table below details the rent increase by neighborhood. <br><br>
  <table id="rent-table">
    <thead>
      <tr>
        <th>Neighborhood</th>
        <th>2010 Median Rent</th>
        <th>2020 Median Rent</th>
        <th>Absolute Increase</th>
        <th>% Increase</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Roxbury</td>
        <td>$1,141</td>
        <td>$1,579</td>
        <td>$438</td>
        <td>38.4%</td>
      </tr>
      <tr>
        <td>Dorchester</td>
        <td>$1,200</td>
        <td>$1,650</td>
        <td>$450</td>
        <td>37.5%</td>
      </tr>
      <tr>
        <td>Jamaica Plain</td>
        <td>$1,250</td>
        <td>$1,700</td>
        <td>$450</td>
        <td>36.0%</td>
      </tr>
      <tr>
        <td>South End</td>
        <td>$1,500</td>
        <td>$2,000</td>
        <td>$500</td>
        <td>33.3%</td>
      </tr>
    </tbody>
  </table>
  
<br><br><b>Sources:</b> 
<a href="https://www.cityofboston.gov/Images_Documents/Roxbury_Planning_District_Profile_tcm3-12996.pdf" target="_blank">City of Boston Planning Profile (2010)</a>,
<a href="https://www.rentcafe.com/average-rent-market-trends/us/ma/boston/roxbury/" target="_blank">RentCafe Roxbury Trends</a>`
  }  
};

// function showChart(type) {
//   const ctx = document.getElementById('chartCanvas').getContext('2d');
//   if (chart) chart.destroy(); // Destroy existing chart
//   chart = new Chart(ctx, chartConfigs[type]);
//   document.getElementById('chartDescription').innerHTML = chartConfigs[type].description;
// }

function showChart(type) {
    const ctx = document.getElementById('chartCanvas').getContext('2d');
    if (chart) chart.destroy();
    chart = new Chart(ctx, chartConfigs[type]);
    document.getElementById('chartDescription').innerHTML = chartConfigs[type].description;
    highlightButton(type);
  }

function highlightButton(activeType) {
    const buttons = document.querySelectorAll('#buttons button');
    buttons.forEach(btn => {
      if (btn.textContent.toLowerCase() === activeType) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }  

// Automatically show the eviction chart on page load
window.onload = () => {
    showChart('eviction');
    highlightButton('eviction');
  };
  