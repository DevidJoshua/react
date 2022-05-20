import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'

export default function ContentHeader (props) {
  return (
    <Breadcrumbs aria-label='breadcrumb'>
      {props.breadcrumb.map(r => (
        <Link
          key={r.title}
          underline='hover'
          color='inherit'
          href={r.link}
        >
          {r.title}
        </Link>
      ))}
    </Breadcrumbs>
    // <section className='content-header'>
    //   <div className='container-fluid'>
    //     <nav aria-label='breadcrumb'>
    //       <ol className='breadcrumb'>
    //         {this.props.breadcrumb.map(r => (<li key={r.title} className={r.isActive ? 'breadcrumb-item active' : 'breadcrumb-item'}>{r.link && <Link to={r.link}>{r.title}</Link>}{!r.link && r.title}</li>))}
    //       </ol>
    //     </nav>
    //   </div>
    // </section>
  )
}
