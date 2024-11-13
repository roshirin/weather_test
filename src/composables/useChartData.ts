export function useChartData() {
  const getOneDayChartData = (data) => {
    const timezoneOffset = data.city.timezone

    const stringifyTimestamp = (timestamp) => {
      const localTimestamp = timestamp + timezoneOffset
      const date = new Date(localTimestamp * 1000)

      let hours = date.getUTCHours()

      if (hours.length === 1) {
        hours = '0' + hours
      }

      return `${hours}:00`
    }

    return data.list.map((forecastEntry) => {
      const {
        dt,
        main: { temp },
      } = forecastEntry;
      const time = stringifyTimestamp(dt).slice(0, 5)

      return { time, temperature: Math.round(temp) }
    });
  };

  const getFiveDaysChartData = (data) => {
    return data.map((forecastEntry) => {
      const {
        date,
        month,
        dayTemp,
        nightTemp,
      } = forecastEntry

      return { date, month, dayTemp, nightTemp }
    })
  }

  return {
    getOneDayChartData,
    getFiveDaysChartData,
  }
}