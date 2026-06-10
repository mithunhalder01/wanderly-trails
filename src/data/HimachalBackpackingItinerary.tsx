import { Link } from "wouter";
import { ArrowLeft, Phone, MessageCircle } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { CONTACT_WHATSAPP_NUMBER, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_DIGITS } from "@/lib/contact";

export default function HimachalBackpackingItinerary() {
  const contactPhone = CONTACT_PHONE_DISPLAY; // Site-wide contact details
  const whatsappMsg = encodeURIComponent(
    `Hi! I'm interested in the Himachal Backpacking package (8D/7N). Can you please share more details or help me book?`
  );
  const whatsappUrl = `https://wa.me/${CONTACT_WHATSAPP_NUMBER}?text=${whatsappMsg}`;

  return (
    <div className="pt-20 bg-background min-h-screen">
      <div className="relative h-[250px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
          alt="Himachal Backpacking"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute top-0 left-0 right-0 z-20 pt-6">
          <PageHeader
            backHref="/destinations/1" // Link back to Himachal destination detail
            breadcrumbs={[{ label: "Home", href: "/" }, { label: "Destinations", href: "/destinations" }, { label: "Himachal", href: "/destinations/1" }]}
            currentTitle="Himachal Backpacking"
          />
        </div>
        <div className="absolute inset-0 flex flex-col justify-end p-8 z-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white leading-tight drop-shadow-md">
            HIMACHAL BACKPACKING
          </h1>
          <p className="text-white/80 text-sm md:text-base mt-2">
            SHIMLA | MANALI | DALHOUSIE | KASOL | AMRITSAR
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Info */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-xl font-serif font-bold mb-4">Contact for Booking</h2>
              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-primary" />
                <span className="text-lg font-semibold">{contactPhone}</span>
              </div>
              <p className="text-muted-foreground mt-2">
                Scroll down for full itinerary details.
              </p>
            </div>

            {/* Timeline Summary */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-xl font-serif font-bold mb-4">Your Timeline Summary</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="bg-muted p-3 rounded-lg">
                  <p className="font-semibold text-sm">DAY 1</p>
                  <p className="text-xs text-muted-foreground">DELHI TO SHIMLA</p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="font-semibold text-sm">DAY 2</p>
                  <p className="text-xs text-muted-foreground">SHIMLA + KUFRI</p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="font-semibold text-sm">DAY 3</p>
                  <p className="text-xs text-muted-foreground">MANALI LOCAL</p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="font-semibold text-sm">DAY 4</p>
                  <p className="text-xs text-muted-foreground">SOLANG VALLEY</p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="font-semibold text-sm">DAY 5</p>
                  <p className="text-xs text-muted-foreground">KULLU + KASOL</p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="font-semibold text-sm">DAY 6</p>
                  <p className="text-xs text-muted-foreground">KHAJJIAR + DALHOUSIE</p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="font-semibold text-sm">DAY 7</p>
                  <p className="text-xs text-muted-foreground">AMRITSAR</p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="font-semibold text-sm">DAY 8</p>
                  <p className="text-xs text-muted-foreground">REACH DELHI</p>
                </div>
              </div>
            </div>

            {/* Detailed Itinerary */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-xl font-serif font-bold mb-4">Detailed Itinerary</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg text-primary">DAY 1: DELHI TO SHIMLA</h3>
                  <p className="text-muted-foreground mt-1">
                    Morning 10 AM Departure from Delhi to Shimla. Night reach at Shimla. Check-in & Rest in Leisure, Dinner & Overnight stay at Hotel.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-primary">DAY 2: SHIMLA - KUFRI</h3>
                  <p className="text-muted-foreground mt-1">
                    Breakfast. Morning 9 AM checkout and proceed to visit sightseeing Kufri, Green Valley. Visit Mall Road, St. Christ Church, The Ridge, Scandal Point. Dinner. Night departure to Manali at 10 PM.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-primary">DAY 3: MANALI LOCAL SIGHTSEEING</h3>
                  <p className="text-muted-foreground mt-1">
                    Reach Manali at 9 AM and Check into Hotel (Early check-in depends upon availability of rooms). Afternoon, Proceed to visit Local Sightseeing of Hadimba Temple, Van Vihar, Tibetan Monastery and Mall Road. Have Dinner. Overnight Stay at Hotel.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-primary">DAY 4: SOLANG VALLEY & MORE</h3>
                  <p className="text-muted-foreground mt-1">
                    Breakfast. At 8 AM proceed to Solang Valley, Atal Tunnel (if open). Adventurous trekk of Jogini Waterfall (If time permits), Vashisht Temple & Hot Spring. Have Dinner with Bonfire & Enjoy Music Party. Overnight Stay at Manali.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-primary">DAY 5: KULLU - KASOL</h3>
                  <p className="text-muted-foreground mt-1">
                    Breakfast and then checkout & Proceed to Kullu Rafting Point. Visit Kasol, Manikaran Sahib. Enjoy Dinner at Langar “where food prepared from healthy sulphuric water”. Later at 10 PM proceed to Dalhousie.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-primary">DAY 6: KHAJJIAR - DALHOUSIE</h3>
                  <p className="text-muted-foreground mt-1">
                    Morning Reach at Dalhousie. Have Breakfast & Rest. Afternoon visit to Khajjiar, Mini Switzerland of India. Mall Road, St John’s Church & Gandhi Chowk. Have Dinner. Overnight stay at Dalhousie.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-primary">DAY 7: AMRITSAR</h3>
                  <p className="text-muted-foreground mt-1">
                    Breakfast. Proceed to Amritsar. Visit Wagah Border (if open), Golden Temple & Market. Have Dinner at Golden Temple Langar “The World’s Largest Kitchen”. Night departure to Delhi.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-primary">DAY 8: REACH DELHI</h3>
                  <p className="text-muted-foreground mt-1">
                    Reach Delhi. Trip Ends with Wonderful Memories of Himalayas.
                  </p>
                </div>
              </div>
            </div>

            {/* Cost of Package */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-xl font-serif font-bold mb-4">Cost of Package Per Person</h2>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">TRIPLE/QUAD SHARING</p>
                  <p className="text-2xl font-bold text-primary mt-1">₹12,999/-</p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">DOUBLE SHARING</p>
                  <p className="text-2xl font-bold text-primary mt-1">₹14,999/-</p>
                </div>
              </div>
            </div>


            {/* Inclusions */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-xl font-serif font-bold mb-4">Inclusions</h2>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li className="flex items-start gap-2"><span className="text-green-600">✔</span> ANJANI MAHADEV TREK (IF TIME PERMITS)</li>
                <li className="flex items-start gap-2"><span className="text-green-600">✔</span> ADVENTURE TREKKING OF JOGINI WATERFALL</li>
                <li className="flex items-start gap-2"><span className="text-green-600">✔</span> BONFIRE, ACTIVITIES BURMA BRIDGE, BALANCED BRIDGE, ROCK CLIMBING (IF YOU CHOOSE TO STAY 1N AT MANALI CAMP AT THE TIME OF BOOKING)</li>
                <li className="flex items-start gap-2"><span className="text-green-600">✔</span> MUSIC PARTY</li>
                <li className="flex items-start gap-2"><span className="text-green-600">✔</span> ALL TRANSFERS FROM DELHI BY AC TEMPO TRAVELLER</li>
                <li className="flex items-start gap-2"><span className="text-green-600">✔</span> 2 NIGHTS STAY AT MANALI</li>
                <li className="flex items-start gap-2"><span className="text-green-600">✔</span> 1 NIGHT STAY AT SHIMLA</li>
                <li className="flex items-start gap-2"><span className="text-green-600">✔</span> 1 NIGHT STAY AT DALHOUSIE</li>
                <li className="flex items-start gap-2"><span className="text-green-600">✔</span> EARLY CHECK-INS AT MANALI & DALHOUSIE (IF ROOMS ARE AVAILABLE)</li>
                <li className="flex items-start gap-2"><span className="text-green-600">✔</span> 5 BREAKFAST, 5 DINNER AND 2 LANGAR</li>
                <li className="flex items-start gap-2"><span className="text-green-600">✔</span> TOLL, PARKING AND TRANSPORT TAXES</li>
                <li className="flex items-start gap-2"><span className="text-green-600">✔</span> VIRTUAL TRAVEL MANAGER</li>
                <li className="flex items-start gap-2"><span className="text-green-600">✔</span> SIGHTSEEING OR “DHERSAARI MASTI”</li>
              </ul>
            </div>

            {/* Exclusions */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-xl font-serif font-bold mb-4">Exclusions</h2>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li className="flex items-start gap-2"><span className="text-red-500">✖</span> PERSONAL EXPENSES</li>
                <li className="flex items-start gap-2"><span className="text-red-500">✖</span> 5% GST ON BILLING</li>
                <li className="flex items-start gap-2"><span className="text-red-500">✖</span> ANY COST ARISING DUE TO NATURAL CALAMITIES LIKE LANDSLIDES, ROAD BLOCKS ETC. (TO BE BORNE BY THE CLIENT DIRECTLY ON THE SPOT)</li>
                <li className="flex items-start gap-2"><span className="text-red-500">✖</span> ANYTHING NOT MENTIONED IN INCLUSIONS</li>
              </ul>
            </div>

            {/* Terms & Conditions */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-xl font-serif font-bold mb-4">Terms & Conditions</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
                <li>STANDARD TIME OF CHECK-IN AT 1 AM, EARLY CHECK-INS ARE DEPEND ON AVAILABILITY, YOUR COOPERATION ARE APPRECIABLE.</li>
                <li>TRANSPORTATION SHALL BE PROVIDED AS PER THE ITINERARY AND WILL NOT BE AT DISPOSAL. (AC WILL NOT WORK ON HILLS)</li>
                <li>WANDERLY TRAILS WILL NOT BE LIABLE FOR ANY DELAY IN, CHANGE TO OR CANCELLATION OF TRIPS DUE TO FORCE MAJEURE. 'FORCE MAJEURE' MEANS A CIRCUMSTANCE BEYOND THE REASONABLE CONTROL OF THE COMPANY AND INCLUDES, BUT IS NOT LIMITED TO, WAR OR THREAT OF WAR, RIOT, LOCKDOWN, CIVIL STRIFE, TERRORIST ACTIVITY, INDUSTRIAL DISPUTE, DISEASE, INDUSTRIAL OR NUCLEAR DISASTER, ADVERSE WEATHER CONDITIONS, FIRE, RESTRICT TO ENTRY OF ANY PLACE, FLIGHT/TRAIN CANCELLATION AND STRIKE. WHILE WE WILL DO OUR BEST TO MAKE SUITABLE ALTERNATE ARRANGEMENTS, WE WOULD NOT BE HELD LIABLE FOR ANY REFUNDS/COMPENSATION CLAIMS ARISING OUT OF THIS.</li>
                <li>CHANGE HOTEL AND/TOUR PROGRAMME DUE TO UNAVOIDABLE CIRCUMSTANCES WHICH ARE NOT IN CONTROL OF THE COMPANY, IN THIS CASE SAME CATEGORY OF HOTEL WILL BE ALLOTTED.</li>
                <li>REGISTRATION ONCE BOOKED CANNOT BE CANCELLED, TRANSFERRED AND EXCHANGED.</li>
                <li>IN CASE OF BREAKDOWN OF THE VEHICLE, TRAVELLERS HAVE TO WAIT FOR REPAIR OR OTHER ALTERNATE OPTION ARRANGED BY THE COMPANY.</li>
                <li>COVID GUIDELINES MUST BE FOLLOWED BY ALL TRAVELLERS.</li>
                <li>TRAVELERS ARE SOLE RESPONSIBLE FOR ANY MISHAPPENING, THEFT, LOSS, INJURIES, ILLEGAL ACTIVITIES SUCH AS CARRY BANNED DRUGS, UNLAWFUL ACTIVITIES DURING THE TOUR.</li>
                <li>WANDERLY TRAILS RESERVES THE RIGHT TO TAKE PHOTOGRAPHS OF PARTICIPANTS OF A TOUR WITH THEIR CONCERNS THAT MAY BE USED FOR PROMOTIONAL PURPOSES. PARTICIPANTS WHO WOULD PREFER THEIR IMAGE NOT BE USED MUST IDENTIFY THEMSELVES TO THE TOUR LEADER/COMPANY AT THE COMMENCEMENT OF A TRIP.</li>
              </ul>
            </div>

            {/* Payment Policy */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-xl font-serif font-bold mb-4">Payment Policy</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
                <li>₹4000 INR AT THE TIME OF REGISTRATION</li>
                <li>BALANCE PAYMENT 4 DAYS BEFORE DEPARTURE</li>
              </ul>
            </div>

            {/* Cancellation Policy */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-xl font-serif font-bold mb-4">Cancellation Policy</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
                <li>REGISTRATION CHARGES ARE NON REFUNDABLE.</li>
                <li>IF CANCELLATIONS ARE MADE WITHIN 2 DAYS BEFORE THE START DATE OF THE TRIP, 100% OF BOOKING VALUE WILL BE CHARGED AS CANCELLATION FEES.</li>
                <li>IN CASE OF UNFORESEEN WEATHER CONDITIONS OR GOVERNMENT RESTRICTIONS, CERTAIN ACTIVITIES MAY BE CANCELLED AND IN SUCH CASES, WE WILL TRY OUR BEST TO PROVIDE AN ALTERNATE FEASIBLE ACTIVITY. HOWEVER NO REFUND WILL BE PROVIDED FOR THE SAME.</li>
                <li>IN CASE OF LOCKDOWN IN DESTINATION PLACE, CREDIT SHELL WILL BE RELEASED, YOU CAN USE IT IN FUTURE BOOKINGS, AFTER DEDUCTION OF IRCTC/AIRLINE CANCELLATION CHARGES.</li>
                <li>IF CANCEL 5 DAYS BEFORE THE START DATE OF THE TRIP, 50% OF BOOKING VALUE WILL BE CHARGED AS CANCELLATION FEES.</li>
              </ul>
            </div>

            {/* Contact Details */}
            
          </div>

          {/* Right Sidebar - Book Now */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
              <h3 className="font-serif font-bold text-xl mb-2">Book This Trip</h3>
              <p className="text-muted-foreground text-sm mb-5">Get in touch with our experts for booking.</p>
              <div className="text-3xl font-serif font-bold text-primary mb-6">₹12,999/- <span className="text-sm text-muted-foreground font-normal">/ person (starting)</span></div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20bd5c] text-white text-center font-bold py-4 rounded-xl transition-colors shadow-md"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Book on WhatsApp
              </a>
              <a
                href={`tel:${CONTACT_PHONE_DIGITS}`}
                className="flex items-center justify-center gap-2 w-full bg-primary/10 hover:bg-primary/20 text-primary text-center font-semibold py-3 rounded-xl transition-all border border-primary/20 shadow-sm mt-3 text-sm"
              >
                <Phone className="w-4 h-4" /> Call Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}