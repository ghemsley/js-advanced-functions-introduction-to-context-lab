// Your code here
const createEmployeeRecord = (data) => {
  return {
    firstName: data[0],
    familyName: data[1],
    title: data[2],
    payPerHour: data[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

const createEmployeeRecords = (data) =>
  data.map((array) => createEmployeeRecord(array))

const createTimeInEvent = (record, date) => {
  const newDate = date.split(' ')
  record.timeInEvents.push({
    type: 'TimeIn',
    hour: parseInt(newDate[1]),
    date: newDate[0]
  })
  return record
}

const createTimeOutEvent = (record, date) => {
  const newDate = date.split(' ')
  record.timeOutEvents.push({
    type: 'TimeOut',
    hour: parseInt(newDate[1]),
    date: newDate[0]
  })
  return record
}

const hoursWorkedOnDate = (record, date) => {
  const timeInEvent = record.timeInEvents.find((event) => event.date === date)
  const timeOutEvent = record.timeOutEvents.find((event) => event.date === date)
  return (timeOutEvent.hour - timeInEvent.hour) / 100
}

const wagesEarnedOnDate = (record, date) => {
  return hoursWorkedOnDate(record, date) * record.payPerHour
}

const allWagesFor = (record) => {
  const wages = record.timeOutEvents.map((event) =>
    wagesEarnedOnDate(record, event.date)
  )
  return wages.reduce((sum, current) => sum + current)
}

const findEmployeeByFirstName = (records, name) =>
  records.find((record) => record.firstName === name)

const calculatePayroll = (records) => {
  const wages = records.map((record) => allWagesFor(record))
  return wages.reduce((sum, current) => sum + current)
}
