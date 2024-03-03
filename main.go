package main

import (
	"context"
	"fmt"
	"net/http"

	"github.com/IgnacyBialobrzewsi/guess_the_number/views"
)

const ServerPort = "4841"

func main() {
	http.HandleFunc("/", func(rw http.ResponseWriter, r *http.Request) {
		views.Home().Render(
			context.Background(),
			rw,
		)
	})

	fmt.Println("Server listening at http://localhost:" + ServerPort)

	http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("./js"))))
	http.ListenAndServe(":"+ServerPort, nil)
}
