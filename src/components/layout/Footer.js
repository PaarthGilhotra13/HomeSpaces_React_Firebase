import { Link } from "react-router-dom"
export default function Footer() {
	return(
        <>
        <section className="section-footer">
  <div className="container">
    <div className="row">
      <div className="col-sm-12 col-md-4">
        <div className="widget-a">
          <div className="w-header-a">
            <h3 className="w-title-a text-brand">HomeSpaces</h3>
          </div>
          <div className="w-body-a">
            <p className="w-text-a color-text-a">
            456 Dream Street Hyderabad, India
            </p>
          </div>
          <div className="w-footer-a">
            <ul className="list-unstyled">
              <li className="color-a">
                <span className="color-text-a">Phone .</span>{" "}
                96102-XXXXX
              </li>
              <li className="color-a">
                <span className="color-text-a">Email .</span>info@Home_Spaces.com
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-sm-12 col-md-4 section-md-t3">
        <div className="widget-a">
          <div className="w-header-a">
            <h3 className="w-title-a text-brand">The Company</h3>
          </div>
          <div className="w-body-a">
            <div className="w-body-a">
              <ul className="list-unstyled">
                <li className="item-list-a">
                  <i className="bi bi-chevron-right" /> <a href="#">Site Map</a>
                </li>
                <li className="item-list-a">
                  <i className="bi bi-chevron-right" /> <a href="#">Legal</a>
                </li>
                <li className="item-list-a">
                  <i className="bi bi-chevron-right" />{" "}
                  <a href="#">Agent Admin</a>
                </li>
                <li className="item-list-a">
                  <i className="bi bi-chevron-right" /> <a href="#">Careers</a>
                </li>
                <li className="item-list-a">
                  <i className="bi bi-chevron-right" />{" "}
                  <a href="#">Affiliate</a>
                </li>
                <li className="item-list-a">
                  <i className="bi bi-chevron-right" />{" "}
                  <a href="#">Privacy Policy</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-12 col-md-4 section-md-t3">
        <div className="widget-a">
          <div className="w-header-a">
            <h3 className="w-title-a text-brand">Popular Properties in India </h3>
          </div>
          <div className="w-body-a">
            <ul className="list-unstyled">
              <li className="item-list-a">
                <i className="bi bi-chevron-right" /> <Link to="#">Mumbai</Link>
              </li>
              <li className="item-list-a">
                <i className="bi bi-chevron-right" /> <Link to="#">Delhi</Link>
              </li>
              <li className="item-list-a">
                <i className="bi bi-chevron-right" /> <Link to="#">Bangalore</Link>
              </li>
              <li className="item-list-a">
                <i className="bi bi-chevron-right" /> <Link to="#">Chennai</Link>
              </li>
              <li className="item-list-a">
                <i className="bi bi-chevron-right" /> <Link to="#">Hyderabad</Link>
              </li>
              <li className="item-list-a">
                <i className="bi bi-chevron-right" />{" "}
                <Link to="#">Kolkata</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

        <footer>
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <nav className="nav-footer">
          <ul className="list-inline">
            <li className="list-inline-item">
              <Link to="/">Home</Link>
            </li>
            <li className="list-inline-item">
              <Link to="/about">About</Link>
            </li>
            <li className="list-inline-item">
              <Link to="/type">Type</Link>
            </li>
            <li className="list-inline-item">
              <Link to="/property">Property</Link>
            </li>
            <li className="list-inline-item">
              <Link to="/addenquiry">Add Enquiry</Link>
            </li>
          </ul>
        </nav>
        <div className="socials-a">
          <ul className="list-inline">
            <li className="list-inline-item">
              <a href="https://www.facebook.com" target="blank">
                <i className="bi bi-facebook" aria-hidden="true" />
              </a>
            </li>
            <li className="list-inline-item">
              <a href="https://x.com/?lang=en" target="blank">
                <i className="bi bi-twitter" aria-hidden="true" />
              </a>
            </li>
            <li className="list-inline-item">
              <a href="https://www.instagram.com" target="blank">
                <i className="bi bi-instagram" aria-hidden="true" />
              </a>
            </li>
            <li className="list-inline-item">
              <a href="https://www.linkedin.com" target="blank">
                <i className="bi bi-linkedin" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
        <div className="copyright-footer">
          <p className="copyright color-text-a">
            © Copyright &nbsp;
            <span className="color-a">HomeSpaces</span> All Rights Reserved.
          </p>
        </div>
        <div className="credits">
          {/*
      All the links in the footer should remain intact.
      You can delete the links only if you purchased the pro version.
      Licensing information: https://bootstrapmade.com/license/
      Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/buy/?theme=EstateAgency
    */}
          Designed by <strong>Paarth Gilhotra</strong>
        </div>
      </div>
    </div>
  </div>
</footer>
</>
    )
}
