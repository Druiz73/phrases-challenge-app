# User Guide - Phrases App

A cross-platform application for managing and organizing your favorite phrases and quotes.

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Running the Application

```bash
# Start development server
npm start

# Then press:
# - 'w' for Web
# - 'i' for iOS (requires Xcode on Mac)
# - 'a' for Android (requires Android Studio)
```

Or run directly on a specific platform:

```bash
npm run web      # Web browser
npm run ios      # iOS Simulator
npm run android  # Android Emulator
```

---

## 📱 Using the App

### Adding a Phrase

1. Type your phrase in the input field (3-500 characters)
2. Click the **"Add"** button
3. Your phrase will appear as a card below

**Note:** On mobile devices (iOS/Android), the input is a multi-line text area with the Add button below it. On web, they're side by side.

### Searching Phrases

1. Type in the search bar
2. Results filter automatically as you type (with 300ms debounce for performance)
3. Matching terms are highlighted in yellow
4. Clear the search to see all phrases again

### Deleting a Phrase

1. Click the **X** button on any phrase card
2. A confirmation modal will appear
3. Click **"Delete"** to confirm or **"Cancel"** to abort

### Web-Specific Features

- Cards have a fixed height (180px) for visual consistency
- If a phrase is long (>150 characters), click **"▼ Ver más"** to expand
- Click **"▲ Ver menos"** to collapse it back

---

## 💾 Data Persistence

- All phrases are automatically saved to local storage
- Your data persists between app sessions
- No internet connection required

---

## 🎨 User Interface

### Header

- **Title**: "Phrases"
- **Subtitle**: "Collection of memorable quotes"
- **Design**: Purple gradient background with modern, clean look

### Cards

- Each card displays:
  - The phrase text
  - Relative timestamp ("Just now", "5m ago", "2h ago", etc.)
  - Delete button (X)
- Cards have a colored left border for visual appeal
- Shadow effects for depth

### Responsive Design

**Mobile (iOS/Android):**

- 1 column layout
- Larger text input area
- Add button below input
- Compact header to maximize content space
- Shows 5 cards initially, loads more on scroll

**Web:**

- Multi-column grid (1-4 columns based on screen width)
- Input and button side-by-side
- Fixed-height cards with expand/collapse for long content
- Shows 10 cards initially

---

## ⚡ Performance Features

The app includes several optimizations:

- **Smart Re-rendering**: Components only update when necessary
- **Debounced Search**: Search waits 300ms after you stop typing to filter
- **Lazy Loading**: Cards load progressively as you scroll
- **Memoization**: Expensive calculations are cached

---

## 🧪 Testing

Run the test suite to verify everything works correctly:

```bash
# Run all tests
npm test

# Run tests in watch mode (for development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

The project includes:

- Unit tests for business logic
- Integration tests for custom hooks
- Component tests for UI interactions
- > 80% code coverage

---

## 🛠️ Technical Stack

- **Framework**: Expo (React Native + Web)
- **Language**: TypeScript (strict mode)
- **State Management**: Context API + useReducer
- **Storage**: AsyncStorage
- **Testing**: Jest + React Testing Library
- **Architecture**: Clean Architecture with SOLID principles

---

## 📋 Requirements

- Node.js 16 or higher
- npm or yarn
- For iOS: macOS with Xcode
- For Android: Android Studio

---

## 🔧 Troubleshooting

### App won't start

```bash
# Clear cache and restart
npx expo start --clear
```

### Changes not appearing

Press `r` in the Expo terminal to reload, or:

- iOS: Press `Cmd + R` in simulator
- Android: Press `R` twice in Expo terminal
- Web: Refresh browser

### Tests failing

```bash
# Clear Jest cache
npm test -- --clearCache
npm test
```

---

## 📞 Support

For technical details, architecture decisions, and implementation details, see `README.md`.

---

## ✨ Features Summary

✅ Add phrases with validation  
✅ Real-time search with highlighting  
✅ Delete with confirmation  
✅ Persistent storage  
✅ Cross-platform (iOS, Android, Web)  
✅ Responsive grid layout  
✅ Performance optimized  
✅ Modern, colorful UI

---

**Built with React Native, TypeScript, and Clean Architecture principles**
