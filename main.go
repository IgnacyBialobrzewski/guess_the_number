package main

import (
	"context"
	"net/http"

	"github.com/IgnacyBialobrzewsi/guess_the_number/views"
)

const ServerPort = "3000"

func main() {
	http.HandleFunc("/", func(rw http.ResponseWriter, r *http.Request) {
		views.Home().Render(
			context.Background(),
			rw,
		)
	})

	http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("./js"))))
	http.ListenAndServe(":"+ServerPort, nil)
}
