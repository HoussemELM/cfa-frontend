import { email_icon, fax_icon, phone_icon } from "@/utils/assets";
import "./ContactSection.scss";
const ContactSection = () => {
  const data = [{img:phone_icon,name:"Phone",value:"+33 6 19 02 61 10"},
    {img:fax_icon,name:"fax",value:"+33 6 19 02 61 10"},
    {img:email_icon,name:"email",value:"info@gmail.com"}]
  return (
    <div className="contact_section">
      <div className="container">
        <div className="bn"></div>
        <div className="contact_container">
            <h1>Contactez-<span>nous</span></h1>
            <div className="form_container">
                <form>
                    <p>Enim tempor eget pharetra facilisis sed maecenas adipiscing. Eu leo molestie vel,
                         ornare non id blandit netus.</p>
                    <input type="text" placeholder="Nom" required />
                    <input type="email" placeholder="Email" />
                    <input type="phone" placeholder="Telephone" required />
                    <textarea placeholder="Message" ></textarea>
                    <input type="submit"  className="submit-btn" value={"Envoyer"} />
                    <div className="flex items-center md:px-4 w-full justify-between gap-1 md:gap-2 my-4">
                      {data.map((e,i)=>(
                        <div className="flex items-center gap-1 md:gap-2" key={i}>
                          <img src={e.img} className="w-6 h-auto md:w-7" alt="" />
                        <div className="flex flex-col items-start  gap-1">
                          <h6 className="uppercase text-sm md:text-[14px]">{e.name}</h6>
                          <span className="text-red-600 text-xs md:text-[13px]">{e.value}</span>
                        </div>
                      </div>
                      ))}
                   
                    </div>
                </form>
                <div className="map">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6522.693637388003!2d2.3455233194550744!3d48.86459029266767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis%2C%20France!5e0!3m2!1sfr!2sdz!4v1731178752189!5m2!1sfr!2sdz" width="600" height="450" style={{border:"none"}}  loading="lazy" ></iframe> 

                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ContactSection
