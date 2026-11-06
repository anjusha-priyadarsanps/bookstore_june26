import React from 'react'
import AdmiHeader from '../componets/AdmiHeader'
import Sidebar from '../componets/Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faUsers } from '@fortawesome/free-solid-svg-icons'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Pie, PieChart } from 'recharts'
import { generateMockData, RechartsDevtools } from '@recharts/devtools';
const data = generateMockData(6, 823);
const data01 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];
const data02 = [
  { name: 'A1', value: 100 },
  { name: 'A2', value: 300 },
  { name: 'B1', value: 100 },
  { name: 'B2', value: 80 },
  { name: 'B3', value: 40 },
  { name: 'B4', value: 30 },
  { name: 'B5', value: 50 },
  { name: 'C1', value: 100 },
  { name: 'C2', value: 200 },
  { name: 'D1', value: 150 },
  { name: 'D2', value: 50 },
];


function Dashboard() {
  return (
    <>
      <AdmiHeader />
      <div className='md:grid grid-cols-5 gap-10'>
        <div className='col-span-1'>
          <Sidebar />
        </div>
        <div className='col-span-4'>
          <div className="md:grid grid-cols-3 my-10">
            <div className="md:px-5">
              <div className='bg-blue-900 p-5 flex items-center justify-center text-white text-center rounded'>
                <FontAwesomeIcon icon={faBook} className='text-5xl' />
                <div className='text-center ms:5 md:ms-0'>
                  <h3 className='text-md'>Books</h3>
                  <h3 className='text-4xl'>100+</h3>

                </div>

              </div>

            </div>
            <div className="md:px-5">
              <div className='bg-green-900 p-5 flex items-center justify-center text-white text-center rounded'>
                <FontAwesomeIcon icon={faUsers} className='text-5xl' />
                <div className='text-center ms:5 md:ms-0'>
                  <h3 className='text-md'>Users</h3>
                  <h3 className='text-4xl'>100+</h3>

                </div>

              </div>

            </div>
            <div className="md:px-5">
              <div className='bg-yellow-600 p-5 flex items-center justify-center text-white text-center rounded'>
                <FontAwesomeIcon icon={faUsers} className='text-5xl' />
                <div className='text-center ms:5 md:ms-0'>
                  <h3 className='text-md'>Employees</h3>
                  <h3 className='text-4xl'>100+</h3>

                </div>

              </div>

            </div>
          </div>
          {/* grid chart-title */}
          <div className='md:grid grid-cols-2 p-5 mt-10'>
            <div className='font-bold'>
              Book Purchase Ratio

            </div>
            <div className='font-bold'>
              Growth Ratio(Yearly)

            </div>

          </div>
          {/* grid chart */}
          <div className='md:grid grid-cols-2 p-5 mt-10'>
            <div>
              {/* Book Purchase Ratio-barchart */}
              <ResponsiveContainer width={'100%'} height={'300'}>
                <BarChart responsive data={data} margin={{ top: 5, right: 0, left: 0, bottom: 5, }}>
                  <CartesianGrid />
                  <XAxis dataKey="label" />
                  <YAxis width="auto" />
                  <Tooltip />
                  <Legend />
                  <Bar fill='#8884d8' dataKey="x" radius={[10, 10, 0, 0]} />
                  <Bar fill='#82ca9d' dataKey="y" radius={[10, 10, 0, 0]} />
                  <RechartsDevtools />
                </BarChart>

              </ResponsiveContainer>

            </div>
            <div>
              {/* Growth Ratio(Yearly)-pie chart */}
              <ResponsiveContainer width={'100%'} height={'300'}>
                <PieChart responsive>
                  <Pie data={data01} dataKey="value" cx="50%" cy="50%" outerRadius="50%" fill="#8884d8" stroke="white" />
                  <Pie data={data02} dataKey="value" cx="50%" cy="50%" innerRadius="60%" outerRadius="80%" fill="#82ca9d" stroke="white" label />
                  <Tooltip />
                  <RechartsDevtools />
                </PieChart>
              </ResponsiveContainer>


            </div>

          </div>

        </div>

      </div>

    </>
  )
}

export default Dashboard