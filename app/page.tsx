"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Coffee, Utensils, Pizza, Sandwich, Salad, Star, Cake, GlassWater, Wine, ChevronUp, Menu, X } from "lucide-react"

export default function CafeMenu() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showNav, setShowNav] = useState(false)
  const [navVisible, setNavVisible] = useState(true)
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})
  const animatedRefs = useRef(new Set<string>())
  const lastScrollY = useRef(0)

  // Scroll detection for hiding/showing nav
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setShowScrollTop(currentScrollY > 300)
      
      // Hide nav when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setNavVisible(false)
      } else {
        setNavVisible(true)
      }
      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Intersection Observer for section animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id
          const sectionElement = entry.target as HTMLElement

          if (!animatedRefs.current.has(`section-${sectionId}`)) {
            sectionElement.classList.add("animated")
            animatedRefs.current.add(`section-${sectionId}`)

            setTimeout(() => {
              const menuItems = sectionElement.querySelectorAll(".menu-item")
              menuItems.forEach((item, index) => {
                setTimeout(() => {
                  item.classList.add("animated")
                }, index * 50)
              })

              const pizzaTable = sectionElement.querySelector(".pizza-table-container")
              if (pizzaTable) {
                pizzaTable.classList.add("animated")
              }

              const subSections = sectionElement.querySelectorAll(".sub-section")
              subSections.forEach((subSection, index) => {
                setTimeout(() => {
                  subSection.classList.add("animated")
                }, index * 200)
              })
            }, 100)
          }
        }
      })
    }, observerOptions)

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      Object.values(sectionRefs.current).forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      })
      setShowNav(false)
    }
  }

  const getImageUrl = (category: string, itemName: string): string => {
    const imageMap: { [key: string]: { [key: string]: string } } = {
      burgers: {
        "Normal Burger": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
        "Cheese Burger": "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=600&q=80",
        "Special Burger": "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=600&q=80",
        "Double Cheese Burger": "https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6?auto=format&fit=crop&w=600&q=80",
        "Double Beef Burger": "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80",
      },
      pizza: {
        "Beef Pizza": "https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?auto=format&fit=crop&w=600&q=80",
        "Cheese Pizza": "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=600&q=80",
        "Veggie Pizza": "https://images.unsplash.com/photo-1593246049226-ded77bf90326?auto=format&fit=crop&w=600&q=80",
        "Chicken Pizza": "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80",
        "Tuna Pizza": "https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?auto=format&fit=crop&w=600&q=80",
        "Special Pizza": "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=600&q=80",
      },
      sandwiches: {
        "Egg Sandwich": "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80",
        "Avocado Sandwich": "https://images.unsplash.com/photo-1524338198850-8a2ff63aaceb?auto=format&fit=crop&w=600&q=80",
        "Chicken Sandwich / Wrap": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80",
        "Tuna Sandwich": "https://images.unsplash.com/photo-1559054663-e8d23213f55c?auto=format&fit=crop&w=600&q=80",
        "Vegetable Sandwich with Cheese": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
        "Beef Sandwich / Wrap": "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=600&q=80",
        "Vegetable Sandwich": "https://images.unsplash.com/photo-1481070555726-e2fe8357725c?auto=format&fit=crop&w=600&q=80",
        "Club Sandwich": "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=600&q=80",
      },
      salads: {
        "Mixed Salad": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
        "Chicken Salad": "https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?auto=format&fit=crop&w=600&q=80",
        "Tuna Salad": "https://images.unsplash.com/photo-1551248429-40975aa4de74?auto=format&fit=crop&w=600&q=80",
        "Chicken Soup": "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&w=600&q=80",
      },
      special: {
        "Chechebsa with Salad": "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=600&q=80",
        "Special Chechebsa": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80",
        "Wanofi Lantate": "https://images.unsplash.com/photo-1555507036-ab794f27d2e9?auto=format&fit=crop&w=600&q=80",
        "Wanofi Oats Lantate": "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=600&q=80",
        "Special Oats Lantate": "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=600&q=80",
      },
      cakes: {
        "Banana Bread": "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=600&q=80",
        "Carrot Cakes": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80",
        "English Cakes": "https://images.unsplash.com/photo-1608231387040-848b4d0c8d68?auto=format&fit=crop&w=600&q=80",
        Muffins: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&w=600&q=80",
        "Marble Cake": "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=600&q=80",
        Brownie: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=600&q=80",
        "Chocolate Lava": "https://images.unsplash.com/photo-1623334044303-241021148842?auto=format&fit=crop&w=600&q=80",
      },
      coffee: {
        Tea: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80",
        "Green Tea": "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=600&q=80",
        "Lemon Tea": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
        Milk: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=600&q=80",
        "Hot Chocolate": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
        Cappuccino: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80",
        "Double Espresso": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
      },
      juices: {
        "Mixed Juice": "https://images.unsplash.com/photo-1600271886742-f049cd5bb8fe?auto=format&fit=crop&w=600&q=80",
        "Orange Juice": "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=600&q=80",
        "Avocado Juice": "https://images.unsplash.com/photo-1621939514649-280df2f3d65f?auto=format&fit=crop&w=600&q=80",
      },
      drinks: {
        Novada: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=600&q=80",
        "Ambo Mineral Water": "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=600&q=80",
        "Soft Drink": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80",
        Water: "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=600&q=80",
      },
    }

    if (category === "cakes" && itemName.includes("Cookies")) {
      return "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80"
    }

    if (itemName.includes("Smoothie")) {
      return "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=600&q=80"
    }

    if (itemName.includes("Ice")) {
      return "https://images.unsplash.com/photo-1568649929103-28ffbefaca1e?auto=format&fit=crop&w=600&q=80"
    }

    if (imageMap[category] && imageMap[category][itemName]) {
      return imageMap[category][itemName]
    }

    const fallbackImages: { [key: string]: string } = {
      burgers: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
      pizza: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80",
      sandwiches: "https://images.unsplash.com/photo-1485451456034-3f9391c6f769?auto=format&fit=crop&w=600&q=80",
      salads: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
      special: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80",
      cakes: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=600&q=80",
      coffee: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=600&q=80",
      juices: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=600&q=80",
      drinks: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=600&q=80",
    }

    return fallbackImages[category] || "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80"
  }

  const menuData = {
    coffee: {
      title: "Coffee & Tea",
      icon: Coffee,
      subsections: [
        {
          title: "Hot Drinks",
          items: [
            { name: "Tea", price: 60 },
            { name: "Green Tea", price: 70 },
            { name: "Lemon Tea", price: 80 },
            { name: "Milk", price: 105 },
            { name: "Hot Chocolate", price: 190 },
            { name: "Cappuccino", price: 220 },
            { name: "Double Espresso", price: 250 },
          ],
        },
        {
          title: "Ice Drinks",
          items: [
            { name: "Ice Tea", price: 250 },
            { name: "Ice Coffee", price: 320 },
            { name: "Ice Late", price: 350 },
          ],
        },
      ],
    },
    cakes: {
      title: "Cakes & Cookies",
      icon: Cake,
      subsections: [
        {
          title: "Cakes",
          items: [
            { name: "Banana Bread", price: 180 },
            { name: "Carrot Cakes", price: 180 },
            { name: "English Cakes", price: 180 },
            { name: "Muffins", price: 180 },
            { name: "Marble Cake", price: 180 },
            { name: "Chocolate Lava", price: 400 },
            { name: "Brownie", price: 380 },
          ],
        },
        {
          title: "Cookies",
          items: [
            { name: "K. Cookies", price: "250 (100mg) / 180 (50mg)" },
            { name: "Cookies", price: "250 / 180" },
            { name: "Mixed Cookies", price: 250 },
          ],
        },
      ],
    },
    juices: {
      title: "Juices & Smoothies",
      icon: GlassWater,
      subsections: [
        {
          title: "Juices",
          items: [
            { name: "Mixed Juice", price: 400 },
            { name: "Orange Juice", price: 380 },
            { name: "Avocado Juice", price: 320 },
            { name: "Mango Juice", price: 320 },
            { name: "Watermelon Juice", price: 320 },
          ],
        },
        {
          title: "Smoothies",
          items: [
            { name: "Strawberry Smoothie", price: 300 },
            { name: "Vanilla Smoothie", price: 300 },
            { name: "Chocolate Smoothie", price: 300 },
          ],
        },
      ],
    },
    sandwiches: {
      title: "Sandwiches & Wraps",
      icon: Sandwich,
      items: [
        { name: "Egg Sandwich", description: "Onion, Tomato, Chili and Egg", price: 380 },
        { name: "Avocado Sandwich", description: "Avocado, Onion, Tomato and Chili", price: 480 },
        { name: "Chicken Sandwich / Wrap", description: "Chicken, Onion and Cheese", price: 800, tag: "Wrap Available" },
        { name: "Tuna Sandwich", description: "Tuna, Tomato, Onion, Chili and Cucumber", price: 800 },
        { name: "Vegetable Sandwich with Cheese", description: "Carrot, Onion, Spinach Cheese, Lettuce, Broccoli, Corn Fowler & Chili", price: 650 },
        { name: "Beef Sandwich / Wrap", description: "Beef, Onion and Cheese", price: 700, tag: "Wrap Available" },
        { name: "Vegetable Sandwich", description: "Carrot, Onion, Spinach, Lettuce, Broccoli, Corn Fowler & Chili", price: 500 },
        { name: "Club Sandwich", description: "Chicken, Lettuce, Carrot, Onion, Cheese, Egg and Tomato", price: 1100 },
      ],
    },
    burgers: {
      title: "Burgers",
      icon: Utensils,
      items: [
        { name: "Normal Burger", description: "Onion, Beef, Tomato, Salad, Green Pepper", price: 750 },
        { name: "Cheese Burger", description: "Cheese, Beef, Onion, Lettuce, Tomato, Green Pepper", price: 900 },
        { name: "Special Burger", description: "Egg, Onion, Tomato, Green Pepper, Beef, Chicken, Mortadella Cheese", price: 1100 },
        { name: "Double Cheese Burger", description: "Double Cheese, Beef, Onion, Lettuce, Tomato, Green Pepper", price: 1000 },
        { name: "Double Beef Burger", description: "Double Beef, Onion, Tomato, Salad, Green Pepper", price: 1200 },
      ],
    },
    pizza: {
      title: "Pizza",
      icon: Pizza,
      items: [
        { type: "Beef Pizza", large: 1200, medium: 1100, small: 900 },
        { type: "Cheese Pizza", large: 1000, medium: 900, small: 800 },
        { type: "Veggie Pizza", large: 1000, medium: 900, small: 800 },
        { type: "Chicken Pizza", large: 1200, medium: 1100, small: 900 },
        { type: "Tuna Pizza", large: 1200, medium: 1100, small: "-" },
        { type: "Special Pizza", large: 1400, medium: "-", small: "-" },
      ],
    },
    salads: {
      title: "Salads & Soups",
      icon: Salad,
      items: [
        { name: "Mixed Salad", description: "Tomato, Onion, Carrot, Cucumber, Chili and Lettuce", price: 500 },
        { name: "Chicken Salad", description: "Chicken, Tomato, Onion, Cucumber and Carrot", price: 800 },
        { name: "Tuna Salad", description: "Tuna, Tomato, Onion, Lettuce and Chili", price: 900 },
        { name: "Chicken Soup", description: "Chicken Cream and Bechamel Sauce", price: 700 },
      ],
    },
    drinks: {
      title: "Soft Drinks",
      icon: Wine,
      items: [
        { name: "Novada", price: 100 },
        { name: "Ambo Mineral Water", price: 95 },
        { name: "Soft Drink", description: "Coke, Sprite, Fanta", price: 85 },
        { name: "Water", price: 60 },
      ],
    },
    special: {
      title: "Special Menu",
      icon: Star,
      items: [
        { name: "Chechebsa with Salad", description: "Tef, Tomato, Chili, Onion, Avocado and Lettuce", price: 500 },
        { name: "Special Chechebsa", description: "Tef, Egg and Honey", price: 600 },
        { name: "Wanofi Lantate", description: "", price: 500 },
        { name: "Wanofi Oats Lantate", description: "Flour, Meat", price: 650 },
        { name: "Special Oats Lantate", description: "Oats Flour, Meat, Egg", price: 700 },
      ],
    },
  }

  type MenuDataKey = keyof typeof menuData

  const renderMenuSection = (sectionKey: MenuDataKey) => {
    const section = menuData[sectionKey]
    const Icon = section.icon

    return (
      <div
        key={sectionKey}
        id={sectionKey}
        className="menu-section"
        ref={(el) => {
          sectionRefs.current[sectionKey] = el
        }}
      >
        <div className="section-header" onClick={() => scrollToSection(sectionKey)}>
          <Icon className="w-6 h-6 text-[#e55934]" />
          <h2 className="text-xl font-bold">{section.title}</h2>
        </div>

        <div className="menu-items">
          {sectionKey === "pizza" ? (
            <>
              {(section as typeof menuData.pizza).items.map((item, index) => (
                <div key={index} className="menu-item">
                  <div className="item-image">
                    <img crossOrigin="anonymous" src={getImageUrl("pizza", item.type) || "/placeholder.svg"} alt={item.type} loading="lazy" />
                  </div>
                  <div className="item-content">
                    <h4>{item.type}</h4>
                    <p>
                      Large: {item.large} ETB | Medium: {item.medium} ETB | Small: {item.small} {item.small !== "-" ? "ETB" : ""}
                    </p>
                  </div>
                </div>
              ))}
            </>
          ) : "subsections" in section ? (
            (section as typeof menuData.cakes).subsections.map((subsection, idx) => (
              <div key={idx} className="sub-section">
                <h3>{subsection.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {subsection.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="menu-item">
                      <div className="item-image">
                        <img crossOrigin="anonymous" src={getImageUrl(sectionKey, item.name) || "/placeholder.svg"} alt={item.name} loading="lazy" />
                      </div>
                      <div className="item-content">
                        <h4>{item.name}</h4>
                        <span className="price">{typeof item.price === "number" ? `${item.price} ETB` : item.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            (section as typeof menuData.burgers).items.map((item, index) => (
              <div key={index} className="menu-item">
                <div className="item-image">
                  <img crossOrigin="anonymous" src={getImageUrl(sectionKey, item.name) || "/placeholder.svg"} alt={item.name} loading="lazy" />
                </div>
                <div className="item-content">
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                  {"tag" in item && item.tag && <span className="item-tag">{item.tag}</span>}
                  <span className="price">{item.price} ETB</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="app-container">
      {/* Left sidebar toggle button */}
      <button
        onClick={() => setShowNav(!showNav)}
        className={`fixed left-0 top-1/2 -translate-y-1/2 z-[200] bg-gradient-to-br from-[#e55934] to-[#c73e1d] text-white p-3 rounded-r-lg shadow-lg transition-all duration-300 hover:pl-5 hover:shadow-[0_0_20px_rgba(229,89,52,0.5)] ${
          showNav ? "translate-x-64" : "translate-x-0"
        }`}
        aria-label="Toggle menu navigation"
      >
        {showNav ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Slide-out navigation panel */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-[#16213e]/95 backdrop-blur-md z-[150] shadow-2xl transition-transform duration-300 ease-in-out border-r border-[#e55934]/20 ${
          showNav ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 pt-20">
          <h3 className="text-[#e55934] mb-4 text-xl font-bold flex items-center gap-2">
            <Coffee className="w-5 h-5 text-[#e55934] animate-pulse" />
            Jump to Section
          </h3>
          <nav className="flex flex-col gap-2">
            {(Object.keys(menuData) as MenuDataKey[]).map((key) => {
              const Icon = menuData[key].icon
              return (
                <button
                  key={key}
                  onClick={() => scrollToSection(key)}
                  className="nav-link flex items-center gap-2 text-left"
                >
                  <Icon className="w-4 h-4" />
                  {menuData[key].title}
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Overlay when nav is open */}
      {showNav && (
        <div
          className="fixed inset-0 bg-black/30 z-[140] transition-opacity"
          onClick={() => setShowNav(false)}
        />
      )}

      {/* Header */}
      <header className="header-animated">
        <div className="logo">
          <Coffee className="w-10 h-10 text-[#e55934] animate-float" />
          <span>wanofi</span>
        </div>
        <p className="tagline">Delicious food & drinks with mouth-watering photos</p>
      </header>

      {/* Quick navigation bar - hides on scroll */}
      <div className={`quick-nav transition-all duration-300 ${navVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}`}>
        <h3>
          <Coffee className="w-5 h-5 text-[#e55934] animate-pulse" />
          Jump to Section:
        </h3>
        <div className="nav-links">
          {(Object.keys(menuData) as MenuDataKey[]).map((key) => (
            <button
              key={key}
              onClick={() => scrollToSection(key)}
              className="nav-link"
            >
              {menuData[key].title}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Sections */}
      {(Object.keys(menuData) as MenuDataKey[]).map((key) => renderMenuSection(key))}

      {/* Footer */}
      <footer>
        <p>
          Visit us at our location: <span className="highlight">sare bet, Addis Ababa</span> | Open daily 7:00 AM - 10:00 PM
        </p>
        <p>Call us: +251 911 234 567 | Email: hello@urbancafe.com</p>
      </footer>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`scroll-top ${showScrollTop ? "visible" : ""}`}
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-6 h-6" />
      </button>
    </div>
  )
}
